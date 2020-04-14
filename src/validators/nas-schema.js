import Joi from '@hapi/joi'

import { validateSchema } from 'helpers'

const UsersValidate = {
  create: () =>
    validateSchema({
      body: {
        patientId: Joi.string()
          .guid()
          .required(),
        monitoringAndControls: Joi.string().valid('1a', '1b', '1c'),
        laboratoryInvestigations: Joi.boolean(),
        medicationExceptVasoactiveDrugs: Joi.boolean(),
        hygieneProcedures: Joi.string().valid('4a', '4b', '4c'),
        caringForDrains: Joi.boolean(),
        mobilizationAndPositioning: Joi.string().valid('6a', '6b', '6c'),
        supportAndCare: Joi.string().valid('7a', '7b'),
        administrativeAndManagerialTasks: Joi.string().valid('8a', '8b', '8c'),
        ventilatorySupport: Joi.boolean(),
        lungFunction: Joi.boolean(),
        vasoactiveDrugs: Joi.boolean(),
        intravenousReplacement: Joi.boolean(),
        monitoringOfTheLeftAtrium: Joi.boolean(),
        cardiorespiratoryResumption: Joi.boolean(),
        hemofiltrationTechniques: Joi.boolean(),
        urineOutput: Joi.boolean(),
        intracranialPressure: Joi.boolean(),
        acidosisTreatment: Joi.boolean(),
        intravenousHyperalimentation: Joi.boolean(),
        enteralFeeding: Joi.boolean(),
        specificInterventionsInTheUnit: Joi.boolean(),
        specificInterventionsOutsideTheUnit: Joi.boolean()
      }
    }),

  update: () =>
    validateSchema({
      body: {
        patientId: Joi.string()
          .guid()
          .required(),
        monitoringAndControls: Joi.string().valid('1a', '1b', '1c'),
        laboratoryInvestigations: Joi.boolean(),
        medicationExceptVasoactiveDrugs: Joi.boolean(),
        hygieneProcedures: Joi.string().valid('4a', '4b', '4c'),
        caringForDrains: Joi.boolean(),
        mobilizationAndPositioning: Joi.string().valid('6a', '6b', '6c'),
        supportAndCare: Joi.string().valid('7a', '7b'),
        administrativeAndManagerialTasks: Joi.string().valid('8a', '8b', '8c'),
        ventilatorySupport: Joi.boolean(),
        lungFunction: Joi.boolean(),
        vasoactiveDrugs: Joi.boolean(),
        intravenousReplacement: Joi.boolean(),
        monitoringOfTheLeftAtrium: Joi.boolean(),
        cardiorespiratoryResumption: Joi.boolean(),
        hemofiltrationTechniques: Joi.boolean(),
        urineOutput: Joi.boolean(),
        intracranialPressure: Joi.boolean(),
        acidosisTreatment: Joi.boolean(),
        intravenousHyperalimentation: Joi.boolean(),
        enteralFeeding: Joi.boolean(),
        specificInterventionsInTheUnit: Joi.boolean(),
        specificInterventionsOutsideTheUnit: Joi.boolean()
      }
    })
}

export default UsersValidate
