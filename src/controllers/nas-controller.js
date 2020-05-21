import Nas from 'models/Nas'
import Patient from 'models/Patients'
import { plusOneDay } from '../helpers/date'
const NasController = {
  index: async ctx => {
    let {
      items_per_page,
      page,
      order_by,
      order_type,
      name,
      patient_id,
      id,
      created_start_date,
      created_end_date
    } = ctx.query

    if (!items_per_page) {
      items_per_page = 10
    }

    if (!page) {
      page = 0
    }

    if (!order_by) {
      order_by = 'created_at'
    }

    if (!order_type) {
      order_type = 'DESC'
    }

    /* query by name */
    let patientsIds = null
    if (name) {
      const patients = await new Patient()
        .query(function(qb) {
          if (name) {
            const nameToSearch = name
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toUpperCase()
            qb.where('to_search', 'like', `%${nameToSearch}%`)
          }
        })
        .fetchAll()
      patientsIds = patients.map(patient => patient.attributes.id)
    }

    /* filter */
    const nasFiltered = await new Nas()
      .query(function(qb) {
        if (id) {
          qb.where('id', id)
        }
        /* filter by name */
        if (patientsIds) {
          qb.where('patient_id', 'in', patientsIds)
        }

        if (patient_id) {
          qb.where('patient_id', patient_id)
        }

        if (created_start_date && created_end_date) {
          if (created_start_date === created_end_date) {
            qb.where('nas_date', '>=', new Date(created_start_date))
            qb.where('nas_date', '<=', plusOneDay(created_start_date))
          } else {
            qb.where('nas_date', '>=', created_start_date)
            qb.where('nas_date', '<=', plusOneDay(created_end_date))
          }
        } else if (created_start_date) {
          qb.where('nas_date', '>=', new Date(created_start_date))
          qb.where('nas_date', '<=', plusOneDay(created_start_date))
        } else if (created_end_date) {
          qb.where('nas_date', '>=', plusOneDay(created_end_date))
          qb.where('nas_date', '<=', new Date(created_end_date))
        }

        qb.orderBy(order_by, order_type)
        qb.offset(page * items_per_page).limit(items_per_page)
      })
      .fetchAll()

    const idsPatienst = nasFiltered.map(nas => {
      return nas.attributes.patient_id
    })

    let nas
    /* get patients based on nas */
    if (idsPatienst.length) {
      const patients = await new Patient()
        .where('id', 'in', idsPatienst)
        .fetchAll()

      const resolved = await Promise.all(patients)

      nas = nasFiltered.map(nas => {
        const i = resolved.findIndex(
          p => p.attributes.id === nas.attributes.patient_id
        )
        if (i > -1) {
          const { name, to_search } = resolved[i].attributes
          nas.attributes.patient = { name, to_search }
        }
        return nas.attributes
      })
    }

    const total = parseInt(
      await new Nas()
        .query(function(qb) {
          if (id) {
            qb.where('id', id)
          }
          /* filter by name */
          if (patientsIds) {
            qb.where('patient_id', 'in', patientsIds)
          }

          if (patient_id) {
            qb.where('patient_id', patient_id)
          }

          if (created_start_date && created_end_date) {
            if (created_start_date === created_end_date) {
              qb.where('nas_date', '>=', new Date(created_start_date))
              qb.where('nas_date', '<=', plusOneDay(created_start_date))
            } else {
              qb.where('nas_date', '>=', created_start_date)
              qb.where('nas_date', '<=', plusOneDay(created_end_date))
            }
          } else if (created_start_date) {
            qb.where('nas_date', '>=', new Date(created_start_date))
            qb.where('nas_date', '<=', plusOneDay(created_start_date))
          } else if (created_end_date) {
            qb.where('nas_date', '>=', plusOneDay(created_end_date))
            qb.where('nas_date', '<=', new Date(created_end_date))
          }
        })
        .count()
    )

    return {
      data: nas,
      metadata: {
        total,
        page: parseInt(page),
        items_per_page: parseInt(items_per_page)
      }
    }
  },

  show: ctx => new Nas({ id: ctx.params.id }).fetch(),

  create: async ctx => {
    const { body } = ctx.request
    return new Nas({
      patient_id: body.patient_id,
      monitoring_and_controls: body.monitoring_and_controls,
      laboratory_investigations: body.laboratory_investigations,
      medication_except_vasoactive_drugs:
        body.medication_except_vasoactive_drugs,
      hygiene_procedures: body.hygiene_procedures,
      caring_for_drains: body.caring_for_drains,
      mobilization_and_positioning: body.mobilization_and_positioning,
      support_and_care: body.support_and_care,
      administrative_and_managerial_tasks:
        body.administrative_and_managerial_tasks,
      ventilatory_support: body.ventilatory_support,
      lung_function: body.lung_function,
      artificial_airways: body.artificial_airways,
      vasoactive_drugs: body.vasoactive_drugs,
      intravenous_replacement: body.intravenous_replacement,
      monitoring_of_the_left_atrium: body.monitoring_of_the_left_atrium,
      cardiorespiratory_resumption: body.cardiorespiratory_resumption,
      hemofiltration_techniques: body.hemofiltration_techniques,
      urine_output: body.urine_output,
      intracranial_pressure: body.intracranial_pressure,
      acidosis_treatment: body.acidosis_treatment,
      intravenous_hyperalimentation: body.intravenous_hyperalimentation,
      enteral_feeding: body.enteral_feeding,
      specific_interventions_in_the_unit:
        body.specific_interventions_in_the_unit,
      specific_interventions_outside_the_unit:
        body.specific_interventions_outside_the_unit,
      nas_date: body.nas_date
    }).save()
  },

  update: async ctx => {
    const { body } = ctx.request

    return new Nas({ id: ctx.params.id }).save(
      {
        patient_id: body.patient_id,
        monitoring_and_controls: body.monitoring_and_controls,
        laboratory_investigations: body.laboratory_investigations,
        medication_except_vasoactive_drugs:
          body.medication_except_vasoactive_drugs,
        hygiene_procedures: body.hygiene_procedures,
        caring_for_drains: body.caring_for_drains,
        mobilization_and_positioning: body.mobilization_and_positioning,
        support_and_care: body.support_and_care,
        administrative_and_managerial_tasks:
          body.administrative_and_managerial_tasks,
        ventilatory_support: body.ventilatory_support,
        lung_function: body.lung_function,
        artificial_airways: body.artificial_airways,
        vasoactive_drugs: body.vasoactive_drugs,
        intravenous_replacement: body.intravenous_replacement,
        monitoring_of_the_left_atrium: body.monitoring_of_the_left_atrium,
        cardiorespiratory_resumption: body.cardiorespiratory_resumption,
        hemofiltration_techniques: body.hemofiltration_techniques,
        urine_output: body.urine_output,
        intracranial_pressure: body.intracranial_pressure,
        acidosis_treatment: body.acidosis_treatment,
        intravenous_hyperalimentation: body.intravenous_hyperalimentation,
        enteral_feeding: body.enteral_feeding,
        specific_interventions_in_the_unit:
          body.specific_interventions_in_the_unit,
        specific_interventions_outside_the_unit:
          body.specific_interventions_outside_the_unit
      },
      { method: 'update' }
    )
  },

  destroy: ctx => new Nas({ id: ctx.params.id }).destroy()
}

export default NasController
