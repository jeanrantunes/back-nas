import Patient from 'models/Patients'
import HospitalizationReasonPatient from 'models/Hospitalization-reason-patients'
import ComorbiditiesPatient from 'models/Comorbidities-patients'
import Nas from 'models/Nas'
import { plusOneDay } from '../helpers/date'

const PatientsController = {
  index: async ctx => {
    const {
      name,
      outcome,
      bed,
      comorbidities,
      hr,
      latest_nas,
      origin
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
      if (origin) {
        qb.where('origin', origin)
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
          latest_nas && {
            nas: query =>
              query.orderBy('nas_date', 'DESC').limit(items_per_page)
          },
          hr && 'hr',
          comorbidities && 'comorbidities'
        ]
      })
      .map(patient => {
        if (!latest_nas) {
          return patient
        }
        const nas = patient.relations.nas
        if (nas.length) {
          patient.attributes.latest_nas = nas.models[0].attributes
          delete patient.relations.nas
          return patient
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
        'hr',
        'comorbidities'
      ]
    })
    patient.attributes.daily_nas = !!patient.relations.nas.length
    return patient
  },

  create: async ctx => {
    const { body } = ctx.request
    const { hr, comorbidities } = body

    const patient = await new Patient({
      name: body.name,
      birthday: body.birthday,
      origin: body.origin,
      to_search: body.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase(),
      outcome: body.outcome,
      saps_3: body.saps_3,
      outcome_date: body.outcome_date,
      hospitalization_date: body.hospitalization_date,
      bed: body.bed
    })
      .save()
      .then(pat => {
        if (hr) {
          pat.hr().attach(hr)
          pat.attributes.hr = hr
        }
        if (comorbidities) {
          pat.comorbidities().attach(comorbidities)
          pat.attributes.comorbidities = comorbidities
        }
        return pat
      })

    return patient
  },

  update: async ctx => {
    const { body } = ctx.request
    const { hr, comorbidities } = body

    const patient = await new Patient({ id: ctx.params.id })
      .save(
        {
          name: body.name,
          birthday: body.birthday,
          origin: body.origin,
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
      .then(async pat => {
        await new HospitalizationReasonPatient()
          .where('patient_id', ctx.params.id)
          .destroy({ require: false })
        await new ComorbiditiesPatient()
          .where('patient_id', ctx.params.id)
          .destroy({ require: false })

        if (hr) {
          pat.attributes.hr = hr
          pat.hr().attach(hr)
        }
        if (comorbidities) {
          pat.attributes.comorbidities = comorbidities
          pat.comorbidities().attach(comorbidities)
        }
        return pat
      })

    return patient
  },

  destroy: async ctx => {
    const idPatient = ctx.params.id

    await new HospitalizationReasonPatient()
      .where('patient_id', idPatient)
      .destroy({ require: false })

    await new ComorbiditiesPatient()
      .where('patient_id', idPatient)
      .destroy({ require: false })

    await new Nas().where('patient_id', idPatient).destroy({ require: false })

    return new Patient({ id: idPatient }).destroy()
  }
}

export default PatientsController
