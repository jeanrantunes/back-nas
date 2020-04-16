import Joi from '@hapi/joi'

import { validateSchema } from 'helpers'

const UsersValidate = {
  create: () =>
    validateSchema({
      body: {
        patientId: Joi.string()
          .guid()
          .required(),
        monitoringAndControls: Joi.string()
          .valid('1a', '1b', '1c')
          .default('1a'),
        laboratoryInvestigations: Joi.boolean().default(false),
        medicationExceptVasoactiveDrugs: Joi.boolean().default(true),
        hygieneProcedures: Joi.string()
          .valid('4a', '4b', '4c')
          .default('4a'),
        caringForDrains: Joi.boolean().default(true),
        mobilizationAndPositioning: Joi.string()
          .valid('6a', '6b', '6c')
          .default('6b'),
        supportAndCare: Joi.string()
          .valid('7a', '7b')
          .default('7a'),
        administrativeAndManagerialTasks: Joi.string()
          .valid('8a', '8b', '8c')
          .default('8a'),
        ventilatorySupport: Joi.boolean().default(false),
        lungFunction: Joi.boolean().default(true),
        artificialAirways: Joi.boolean().default(true),
        vasoactiveDrugs: Joi.boolean().default(false),
        intravenousReplacement: Joi.boolean().default(true),
        monitoringOfTheLeftAtrium: Joi.boolean().default(true),
        cardiorespiratoryResumption: Joi.boolean().default(false),
        hemofiltrationTechniques: Joi.boolean().default(false),
        urineOutput: Joi.boolean().default(false),
        intracranialPressure: Joi.boolean().default(false),
        acidosisTreatment: Joi.boolean().default(false),
        intravenousHyperalimentation: Joi.boolean().default(false),
        enteralFeeding: Joi.boolean().default(true),
        specificInterventionsInTheUnit: Joi.boolean().default(false),
        specificInterventionsOutsideTheUnit: Joi.boolean().default(false)
      }
    }),

  update: () =>
    validateSchema({
      body: {
        patientId: Joi.string()
          .guid()
          .required(),
        monitoringAndControls: Joi.string()
          .valid('1a', '1b', '1c')
          .default('1a'),
        laboratoryInvestigations: Joi.boolean().default(false),
        medicationExceptVasoactiveDrugs: Joi.boolean().default(true),
        hygieneProcedures: Joi.string()
          .valid('4a', '4b', '4c')
          .default('4a'),
        caringForDrains: Joi.boolean().default(true),
        mobilizationAndPositioning: Joi.string()
          .valid('6a', '6b', '6c')
          .default('6b'),
        supportAndCare: Joi.string()
          .valid('7a', '7b')
          .default('7a'),
        administrativeAndManagerialTasks: Joi.string()
          .valid('8a', '8b', '8c')
          .default('8a'),
        ventilatorySupport: Joi.boolean().default(false),
        lungFunction: Joi.boolean().default(true),
        artificialAirways: Joi.boolean().default(true),
        vasoactiveDrugs: Joi.boolean().default(false),
        intravenousReplacement: Joi.boolean().default(true),
        monitoringOfTheLeftAtrium: Joi.boolean().default(true),
        cardiorespiratoryResumption: Joi.boolean().default(false),
        hemofiltrationTechniques: Joi.boolean().default(false),
        urineOutput: Joi.boolean().default(false),
        intracranialPressure: Joi.boolean().default(false),
        acidosisTreatment: Joi.boolean().default(false),
        intravenousHyperalimentation: Joi.boolean().default(false),
        enteralFeeding: Joi.boolean().default(true),
        specificInterventionsInTheUnit: Joi.boolean().default(false),
        specificInterventionsOutsideTheUnit: Joi.boolean().default(false)
      }
    })
}

export default UsersValidate
