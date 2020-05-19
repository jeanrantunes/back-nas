import knex from 'knex'
import Patient from 'models/Patients'
import HospitalizationReasonPatient from 'models/HospitalizationReasonPatients'
import ComorbiditiesPatient from 'models/ComorbiditiesPatients'
import Comorbidities from 'models/Comorbidities'
import HospitalizationReason from 'models/hospitalizationReason'
import Nas from 'models/Nas'
import { plusOneDay } from '../helpers/date'

const PatientsController = {
  index: async ctx => {
    const {
      name,
      outcome,
      bed,
      comorbidities,
      hospitalization_reason,
      daily_nas
    } = ctx.query

    let {
      items_per_page,
      page,
      order_by,
      order_type,
      hospitalization_start_date,
      hospitalization_end_date,
      outcome_start_date,
      outcome_end_date
    } = ctx.query

    if (!items_per_page) {
      items_per_page = 10
    }

    if (!page) {
      page = 0
    }

    if (!order_by) {
      order_by = 'name'
    }

    if (!order_type) {
      order_type = 'ASC'
    }

    const patientsFiltered = await new Patient().query(function(qb) {
      if (name) {
        const nameToSearch = name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toUpperCase()
        qb.where('to_search', 'like', `%${nameToSearch}%`)
      }
      if (outcome) {
        qb.where('outcome', outcome)
      }
      if (hospitalization_start_date && hospitalization_end_date) {
        qb.where(
          'hospitalization_date',
          '>=',
          new Date(hospitalization_start_date)
        ).where(
          'hospitalization_date',
          '<=',
          plusOneDay(hospitalization_end_date)
        )
      } else if (hospitalization_start_date) {
        qb.where(
          'hospitalization_date',
          '>=',
          new Date(hospitalization_start_date)
        )
        qb.where(
          'hospitalization_date',
          '<=',
          plusOneDay(hospitalization_start_date)
        )
      } else if (hospitalization_end_date) {
        qb.where(
          'hospitalization_date',
          '>=',
          plusOneDay(hospitalization_end_date)
        )
        qb.where(
          'hospitalization_date',
          '<=',
          new Date(hospitalization_end_date)
        )
      }

      if (outcome_start_date && outcome_end_date) {
        qb.where('outcome_date', '>=', new Date(outcome_start_date)).where(
          'outcome_date',
          '<=',
          plusOneDay(outcome_end_date)
        )
      } else if (outcome_start_date) {
        qb.where('outcome_date', '>=', new Date(outcome_start_date))
        qb.where('outcome_date', '<=', plusOneDay(outcome_start_date))
      } else if (outcome_end_date) {
        qb.where('outcome_date', '>=', plusOneDay(outcome_end_date))
        qb.where('outcome_date', '<=', new Date(outcome_end_date))
      }
      if (bed) {
        qb.where('bed', bed)
      }
    })

    const patientWithPagination = await patientsFiltered
      .query(function(qb) {
        qb.orderBy(order_by, order_type)
        qb.offset(page * items_per_page).limit(items_per_page)
      })
      .fetchAll({
        withRelated: [
          daily_nas && {
            nas: query => {
              const now = new Date()
              const to = new Date(now.setDate(now.getDate() + 1))
              return query
                .where('nas_date', '>=', new Date().toLocaleDateString())
                .where('nas_date', '<=', to.toLocaleDateString())
                .column('patient_id', 'id')
            }
          },
          hospitalization_reason && 'hospitalization_reason',
          comorbidities && 'comorbidities'
        ]
      })
      .map(patient => {
        if (patient.relations.nas && patient.relations.nas.length) {
          patient.attributes.daily_nas = true
        }
        delete patient.relations.nas
        return patient
      })

    const total = parseInt(
      await new Patient()
        .query(function(qb) {
          if (name) {
            const nameToSearch = name
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toUpperCase()
            qb.where('to_search', 'like', `%${nameToSearch}%`)
          }
          if (outcome) {
            qb.where('outcome', outcome)
          }
          if (bed) {
            qb.where('bed', bed)
          }
        })
        .count()
    )

    return {
      data: patientWithPagination,
      metadata: {
        total,
        page: parseInt(page),
        items_per_page: parseInt(items_per_page)
      }
    }
  },

  show: async ctx => {
    const now = new Date()
    const to = new Date(now.setDate(now.getDate() + 1))
    const patient = await new Patient({ id: ctx.params.id }).fetch({
      withRelated: [
        {
          nas: query =>
            query
              .where('nas_date', '>=', new Date().toLocaleDateString())
              .where('nas_date', '<=', to.toLocaleDateString())
              .column('patient_id', 'id')
        },
        'hospitalization_reason',
        'comorbidities'
      ]
    })
    patient.attributes.daily_nas = !!patient.relations.nas.length
    delete patient.relations.nas
    return patient
  },

  create: async ctx => {
    const { body } = ctx.request
    const { hospitalization_reason, comorbidities } = body

    const patient = await new Patient({
      name: body.name,
      birthday: body.birthday,
      to_search: body.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase(),
      outcome: body.outcome,
      saps_3: body.saps_3,
      outcome_date: body.outcome_date,
      hospitalization_date: body.hospitalization_date,
      bed: body.bed
    }).save()

    if (hospitalization_reason) {
      const reasonsToAttach = hospitalization_reason.map(c => ({
        hospitalization_reason_id: c,
        patient_id: patient.attributes.id
      }))
      const reasons = await HospitalizationReasonPatient.collection()
        .add(reasonsToAttach)
        .invokeThen('save')
      patient.attributes.hospitalization_reason = reasons.map(r => r.attributes)
    }

    if (comorbidities) {
      const comorbiditiesToAttach = comorbidities.map(c => ({
        comorbidity_id: c,
        patient_id: patient.attributes.id
      }))

      const cms = await ComorbiditiesPatient.collection()
        .add(comorbiditiesToAttach)
        .invokeThen('save')

      patient.attributes.comorbidities = cms.map(r => r.attributes)
    }
    return patient
  },

  update: async ctx => {
    const { body } = ctx.request
    const { hospitalization_reason, comorbidities } = body

    const patient = await new Patient({ id: ctx.params.id }).save(
      {
        name: body.name,
        birthday: body.birthday,
        to_search: body.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toUpperCase(),
        outcome: body.outcome,
        saps_3: body.saps_3,
        outcome_date: body.outcome_date,
        hospitalization_date: body.hospitalization_date,
        bed: body.bed
      },
      { method: 'update' }
    )

    delete patient.attributes.to_search

    await new HospitalizationReasonPatient()
      .where('patient_id', ctx.params.id)
      .destroy({ require: false })
    await new ComorbiditiesPatient()
      .where('patient_id', ctx.params.id)
      .destroy({ require: false })

    if (hospitalization_reason) {
      const reasonsToAttach = hospitalization_reason.map(c => ({
        hospitalization_reason_id: c,
        patient_id: patient.attributes.id
      }))
      const reasons = await HospitalizationReasonPatient.collection()
        .add(reasonsToAttach)
        .invokeThen('save')
      patient.attributes.hospitalization_reason = reasons.map(r => r.attributes)
    }

    if (comorbidities) {
      const comorbiditiesToAttach = comorbidities.map(c => ({
        comorbidity_id: c,
        patient_id: patient.attributes.id
      }))

      const cms = await ComorbiditiesPatient.collection()
        .add(comorbiditiesToAttach)
        .invokeThen('save')

      patient.attributes.comorbidities = cms.map(r => r.attributes)
    }

    return patient
  },

  destroy: async ctx => {
    const idPatient = ctx.params.id

    new HospitalizationReasonPatient()
      .where('patient_id', idPatient)
      .destroy({ require: false })

    new ComorbiditiesPatient()
      .where('patient_id', idPatient)
      .destroy({ require: false })

    new Nas().where('patient_id', idPatient).destroy({ require: false })

    return new Patient({ id: idPatient }).destroy()
  }
}

export default PatientsController
