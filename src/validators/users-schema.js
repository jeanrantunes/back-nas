import Joi from '@hapi/joi'

import { validateSchema } from 'helpers'

const UsersValidate = {
  create: () =>
    validateSchema({
      body: {
        name: Joi.string().required(),
        inviting: Joi.string(),
        email: Joi.string()
          .email()
          .required(),
        role: Joi.string()
          .valid('ADMIN', 'USER')
          .required()
      }
    }),

  update: () =>
    validateSchema({
      body: {
        name: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .min(1)
          .max(100)
          .optional(),
        role: Joi.string()
          .valid('ADMIN', 'USER')
          .required()
      }
    })
}

export default UsersValidate
