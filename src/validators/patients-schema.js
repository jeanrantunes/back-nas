import Joi from '@hapi/joi'

import { validateSchema } from 'helpers'

const UsersValidate = {
  create: () =>
    validateSchema({
      body: {
        name: Joi.string().required(),
        birthday: Joi.date().max('now'),
        outcome: Joi.string()
          .valid('pending', 'death', 'discharge')
          .default('pending'),
        comorbidities: Joi.array().items(Joi.string()),
        saps_3: Joi.number()
          .integer()
          .default(0),
        outcome_date: Joi.date().max('now'),
        hospitalization_date: Joi.date().max('now'),
        hospitalization_reason: Joi.array().items(Joi.string()),
        bed: Joi.string()
          .valid('A', 'B', 'C', 'D', 'E', 'F')
          .required()
      }
    }),

  update: () =>
    validateSchema({
      body: {
        name: Joi.string().required(),
        birthday: Joi.date().max('now'),
        outcome: Joi.string()
          .valid('pending', 'death', 'discharge')
          .default('pending'),
        comorbidities: Joi.array().items(Joi.string()),
        saps_3: Joi.number()
          .integer()
          .default(0),
        outcome_date: Joi.date().max('now'),
        hospitalization_date: Joi.date().max('now'),
        hospitalization_reason: Joi.array().items(Joi.string()),
        bed: Joi.string()
          .valid('A', 'B', 'C', 'D', 'E', 'F')
          .required()
      }
    })
}

export default UsersValidate
