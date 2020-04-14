import ComorbiditiesPatient from 'models/ComorbiditiesPatients'
import Comorbidities from 'models/Comorbidities'

const ComorbiditiesController = {
  index: () => new Comorbidities().fetchAll(),

  show: ctx => new Comorbidities({ id: ctx.params.id }).fetch(),

  create: async ctx => {
    const { body } = ctx.request
    return new Comorbidities({
      name: body.name
    }).save()
  },

  update: async ctx => {
    const { body } = ctx.request

    return new Comorbidities({ id: ctx.params.id }).save(
      {
        name: body.name
      },
      { method: 'update' }
    )
  },

  destroy: async ctx => {
    const hrId = ctx.params.id
    const hr = await new ComorbiditiesPatient()
      .where('comorbiditiesId', hrId)
      .count()

    if (parseInt(hr)) {
      new ComorbiditiesPatient().where('comorbiditiesId', hrId).destroy()
    }

    return new Comorbidities({ id: hrId }).destroy()
  }
}

export default ComorbiditiesController
