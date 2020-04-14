import HospitalizationReasonPatient from 'models/HospitalizationReasonPatients'
import HospitalizationReason from 'models/HospitalizationReason'

const HospitalizationReasonController = {
  index: () => new HospitalizationReason().fetchAll(),

  show: ctx => new HospitalizationReason({ id: ctx.params.id }).fetch(),

  create: async ctx => {
    const { body } = ctx.request
    return new HospitalizationReason({
      name: body.name
    }).save()
  },

  update: async ctx => {
    const { body } = ctx.request

    return new HospitalizationReason({ id: ctx.params.id }).save(
      {
        name: body.name
      },
      { method: 'update' }
    )
  },

  destroy: async ctx => {
    const hrId = ctx.params.id
    const hr = await new HospitalizationReasonPatient()
      .where('hospitalizationReasonId', hrId)
      .count()

    if (parseInt(hr)) {
      new HospitalizationReasonPatient()
        .where('hospitalizationReasonId', hrId)
        .destroy()
    }

    return new HospitalizationReason({ id: hrId }).destroy()
  }
}

export default HospitalizationReasonController
