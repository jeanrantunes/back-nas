import ComorbiditiesPatient from 'models/Comorbidities-patients'
import Comorbidities from 'models/Comorbidities'

const ComorbiditiesController = {
  index: async ctx => {
    let { items_per_page, page, order_type, name } = ctx.query

    if (!page) {
      page = 0
    }

    if (!order_type) {
      order_type = 'ASC'
    }

    const cm = await new Comorbidities()
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
      await new Comorbidities()
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
      data: cm,
      metadata: {
        total,
        page: parseInt(page),
        items_per_page: parseInt(items_per_page)
      }
    }
  },

  show: ctx => new Comorbidities({ id: ctx.params.id }).fetch(),

  create: async ctx => {
    const { body } = ctx.request
    return await new Comorbidities({
      name: body.name,
      to_search: body.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
    }).save()
  },

  update: async ctx => {
    const { body } = ctx.request

    return new Comorbidities({ id: ctx.params.id }).save(
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

    new ComorbiditiesPatient()
      .where('comorbidity_id', id)
      .destroy({ require: false })

    return new Comorbidities({ id }).destroy()
  }
}

export default ComorbiditiesController
