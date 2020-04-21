import Nas from 'models/Nas'
import Patient from 'models/Patients'

const NasController = {
  index: async ctx => {
    let {
      itemsPerPage,
      page,
      orderBy,
      orderType,
      name,
      id,
      createdStartDate,
      createdEndDate
    } = ctx.query

    if (!itemsPerPage) {
      itemsPerPage = 10
    }

    if (!page) {
      page = 0
    }

    if (!orderBy) {
      orderBy = 'created_at'
    }

    if (!orderType) {
      orderType = 'DESC'
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
            qb.where('toSearch', 'ilike', `%${nameToSearch}%`)
          }
        })
        .fetchAll()
      patientsIds = patients.map(patient => patient.attributes.id)
    }

    /* filter */
    const nasFiltered = await new Nas()
      .query(function(qb) {
        if (id) {
          // console.log(id)
          // console.log(typeof id)

          qb.where('id', parseInt(id))
        }
        /* filter by name */
        if (patientsIds) {
          qb.where('patientId', 'in', patientsIds)
        }

        if (createdStartDate && createdEndDate) {
          if (createdStartDate === createdEndDate) {
            qb.where('created_at', '<=', new Date(createdEndDate))
          } else {
            qb.where('created_at', '>=', new Date(createdStartDate))
            qb.where('created_at', '<=', new Date(createdEndDate))
          }
        } else if (createdStartDate) {
          qb.where('created_at', '>=', new Date(createdStartDate))
          qb.where('created_at', '<=', new Date())
        } else if (createdEndDate) {
          qb.where('created_at', '<=', new Date(createdEndDate))
        }
        qb.orderBy(orderBy, orderType)
        qb.offset(page * itemsPerPage).limit(itemsPerPage)
      })
      .fetchAll()

    const idsPatienst = nasFiltered.map(nas => {
      return nas.attributes.patientId
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
          p => p.attributes.id === nas.attributes.patientId
        )
        if (i > -1) {
          const { name, toSearch } = resolved[i].attributes
          nas.attributes.patient = { name, toSearch }
        }
        return nas.attributes
      })
    }

    const total = parseInt(
      await new Nas()
        .query(function(qb) {
          /* filter by name */
          if (patientsIds) {
            qb.where('patientId', 'in', patientsIds)
          }
          if (createdStartDate && createdEndDate) {
            qb.where('created_at', '>=', new Date(createdStartDate))
            qb.where('created_at', '<=', new Date(createdEndDate))
          } else if (createdStartDate) {
            qb.where('created_at', '>=', new Date(createdStartDate))
            qb.where('created_at', '<=', new Date())
          } else if (createdEndDate) {
            qb.where('created_at', '<=', new Date(createdEndDate))
          }
        })
        .count()
    )

    return {
      data: nas,
      metadata: {
        total,
        page: parseInt(page),
        itemsPerPage: parseInt(itemsPerPage)
      }
    }
  },

  show: ctx => new Nas({ id: ctx.params.id }).fetch(),

  create: async ctx => {
    const { body } = ctx.request
    return new Nas({
      patientId: body.patientId,
      monitoringAndControls: body.monitoringAndControls,
      laboratoryInvestigations: body.laboratoryInvestigations,
      medicationExceptVasoactiveDrugs: body.medicationExceptVasoactiveDrugs,
      hygieneProcedures: body.hygieneProcedures,
      caringForDrains: body.caringForDrains,
      mobilizationAndPositioning: body.mobilizationAndPositioning,
      supportAndCare: body.supportAndCare,
      administrativeAndManagerialTasks: body.administrativeAndManagerialTasks,
      ventilatorySupport: body.ventilatorySupport,
      lungFunction: body.lungFunction,
      artificialAirways: body.artificialAirways,
      vasoactiveDrugs: body.vasoactiveDrugs,
      intravenousReplacement: body.intravenousReplacement,
      monitoringOfTheLeftAtrium: body.monitoringOfTheLeftAtrium,
      cardiorespiratoryResumption: body.cardiorespiratoryResumption,
      hemofiltrationTechniques: body.hemofiltrationTechniques,
      urineOutput: body.urineOutput,
      intracranialPressure: body.intracranialPressure,
      acidosisTreatment: body.acidosisTreatment,
      intravenousHyperalimentation: body.intravenousHyperalimentation,
      enteralFeeding: body.enteralFeeding,
      specificInterventionsInTheUnit: body.specificInterventionsInTheUnit,
      specificInterventionsOutsideTheUnit:
        body.specificInterventionsOutsideTheUnit
    }).save()
  },

  update: async ctx => {
    const { body } = ctx.request

    return new Nas({ id: ctx.params.id }).save(
      {
        patientId: body.patientId,
        monitoringAndControls: body.monitoringAndControls,
        laboratoryInvestigations: body.laboratoryInvestigations,
        medicationExceptVasoactiveDrugs: body.medicationExceptVasoactiveDrugs,
        hygieneProcedures: body.hygieneProcedures,
        caringForDrains: body.caringForDrains,
        mobilizationAndPositioning: body.mobilizationAndPositioning,
        supportAndCare: body.supportAndCare,
        administrativeAndManagerialTasks: body.administrativeAndManagerialTasks,
        ventilatorySupport: body.ventilatorySupport,
        lungFunction: body.lungFunction,
        artificialAirways: body.artificialAirways,
        vasoactiveDrugs: body.vasoactiveDrugs,
        intravenousReplacement: body.intravenousReplacement,
        monitoringOfTheLeftAtrium: body.monitoringOfTheLeftAtrium,
        cardiorespiratoryResumption: body.cardiorespiratoryResumption,
        hemofiltrationTechniques: body.hemofiltrationTechniques,
        urineOutput: body.urineOutput,
        intracranialPressure: body.intracranialPressure,
        acidosisTreatment: body.acidosisTreatment,
        intravenousHyperalimentation: body.intravenousHyperalimentation,
        enteralFeeding: body.enteralFeeding,
        specificInterventionsInTheUnit: body.specificInterventionsInTheUnit,
        specificInterventionsOutsideTheUnit:
          body.specificInterventionsOutsideTheUnit
      },
      { method: 'update' }
    )
  },

  destroy: ctx => new Nas({ id: ctx.params.id }).destroy()
}

export default NasController
