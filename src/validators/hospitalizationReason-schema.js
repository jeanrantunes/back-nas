import Joi from '@hapi/joi'

import { validateSchema } from 'helpers'

const HospitalizationReasonValidate = {
  create: () =>
    validateSchema({
      body: {
        name: Joi.string().required()
      }
    }),

  update: () =>
    validateSchema({
      body: {
        name: Joi.string().required()
      }
    })
}

export default HospitalizationReasonValidate
