import Nas from 'models/Nas'

const NasController = {
  index: () => new Nas().fetchAll(),

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
