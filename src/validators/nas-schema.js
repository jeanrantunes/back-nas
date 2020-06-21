import Joi from '@hapi/joi'

import { validateSchema } from 'helpers'

const UsersValidate = {
  create: () =>
    validateSchema({
      body: {
        patient_id: Joi.string()
          .guid()
          .required(),
        monitoring_and_controls: Joi.string()
          .valid('1a', '1b', '1c')
          .default('1a'),
        laboratory_investigations: Joi.boolean().default(false),
        medication_except_vasoactive_drugs: Joi.boolean().default(true),
        hygiene_procedures: Joi.string()
          .valid('4a', '4b', '4c')
          .default('4a'),
        caring_for_drains: Joi.boolean().default(true),
        mobilization_and_positioning: Joi.string()
          .valid('6a', '6b', '6c')
          .default('6b'),
        support_and_care: Joi.string()
          .valid('7a', '7b')
          .default('7a'),
        administrative_and_managerial_tasks: Joi.string()
          .valid('8a', '8b', '8c')
          .default('8a'),
        ventilatory_support: Joi.boolean().default(false),
        lung_function: Joi.boolean().default(true),
        artificial_airways: Joi.boolean().default(true),
        vasoactive_drugs: Joi.boolean().default(false),
        intravenous_replacement: Joi.boolean().default(true),
        monitoring_of_the_left_atrium: Joi.boolean().default(true),
        cardiorespiratory_resumption: Joi.boolean().default(false),
        hemofiltration_techniques: Joi.boolean().default(false),
        urine_output: Joi.boolean().default(false),
        intracranial_pressure: Joi.boolean().default(false),
        acidosis_treatment: Joi.boolean().default(false),
        intravenous_hyperalimentation: Joi.boolean().default(false),
        enteral_feeding: Joi.boolean().default(true),
        specific_interventions_in_the_unit: Joi.boolean().default(false),
        specific_interventions_outside_the_unit: Joi.boolean().default(false),
        nas_date: Joi.date()
      }
    }),

  update: () =>
    validateSchema({
      body: {
        patient_id: Joi.string()
          .guid()
          .required(),
        monitoring_and_controls: Joi.string()
          .valid('1a', '1b', '1c')
          .default('1a'),
        laboratory_investigations: Joi.boolean().default(false),
        medication_except_vasoactive_drugs: Joi.boolean().default(true),
        hygiene_procedures: Joi.string()
          .valid('4a', '4b', '4c')
          .default('4a'),
        caring_for_drains: Joi.boolean().default(true),
        mobilization_and_positioning: Joi.string()
          .valid('6a', '6b', '6c')
          .default('6b'),
        support_and_care: Joi.string()
          .valid('7a', '7b')
          .default('7a'),
        administrative_and_managerial_tasks: Joi.string()
          .valid('8a', '8b', '8c')
          .default('8a'),
        ventilatory_support: Joi.boolean().default(false),
        lung_function: Joi.boolean().default(true),
        artificial_airways: Joi.boolean().default(true),
        vasoactive_drugs: Joi.boolean().default(false),
        intravenous_replacement: Joi.boolean().default(true),
        monitoring_of_the_left_atrium: Joi.boolean().default(true),
        cardiorespiratory_resumption: Joi.boolean().default(false),
        hemofiltration_techniques: Joi.boolean().default(false),
        urine_output: Joi.boolean().default(false),
        intracranial_pressure: Joi.boolean().default(false),
        acidosis_treatment: Joi.boolean().default(false),
        intravenous_hyperalimentation: Joi.boolean().default(false),
        enteral_feeding: Joi.boolean().default(true),
        specific_interventions_in_the_unit: Joi.boolean().default(false),
        specific_interventions_outside_the_unit: Joi.boolean().default(false),
        nas_date: Joi.date()
      }
    })
}

export default UsersValidate
