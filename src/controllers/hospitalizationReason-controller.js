import HospitalizationReasonPatient from 'models/Hospitalization-reason-patients'
import HospitalizationReason from 'models/Hospitalization-reason'

const HospitalizationReasonController = {
  index: async ctx => {
    let { items_per_page, page, order_type, name } = ctx.query

    if (!page) {
      page = 0
    }

    if (!order_type) {
      order_type = 'ASC'
    }

    const reasons = await new HospitalizationReason()
      .query(function(qb) {
        if (name) {
          const nameToSearch = name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase()
          qb.where('to_search', 'like', `%${nameToSearch}%`)
        }
        qb.orderBy('name', order_type)
        qb.offset(page * items_per_page).limit(items_per_page)
      })
      .fetchAll()

    const total = parseInt(
      await new HospitalizationReason()
        .query(function(qb) {
          if (name) {
            const nameToSearch = name
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toUpperCase()
            qb.where('to_search', 'like', `%${nameToSearch}%`)
          }
        })
        .count()
    )

    return {
      data: reasons,
      metadata: {
        total,
        page: parseInt(page),
        items_per_page: parseInt(items_per_page)
      }
    }
  },

  show: ctx => new HospitalizationReason({ id: ctx.params.id }).fetch(),

  create: async ctx => {
    const { body } = ctx.request
    return await new HospitalizationReason({
      name: body.name,
      to_search: body.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
    }).save()
  },

  update: async ctx => {
    const { body } = ctx.request

    return new HospitalizationReason({ id: ctx.params.id }).save(
      {
        name: body.name,
        to_search: body.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toUpperCase()
      },
      { method: 'update' }
    )
  },

  destroy: async ctx => {
    const id = ctx.params.id

    new HospitalizationReasonPatient()
      .where('hospitalization_reason_id', id)
      .destroy({ require: false })

    return new HospitalizationReason({ id }).destroy()
  }
}

export default HospitalizationReasonController
