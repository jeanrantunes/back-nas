import Patient from 'models/Patients'
import HospitalizationReasonPatient from 'models/HospitalizationReasonPatients'
import ComorbiditiesPatient from 'models/ComorbiditiesPatients'
import Comorbidities from 'models/Comorbidities'
import HospitalizationReason from 'models/hospitalizationReason'
import Nas from 'models/Nas'

const PatientsController = {
  index: async ctx => {
    const {
      name,
      outcome,
      bed,
      comorbidities,
      hospitalizationReason
    } = ctx.query

    let { itemsPerPage, page, orderBy, orderType } = ctx.query

    if (!itemsPerPage) {
      itemsPerPage = 10
    }

    if (!page) {
      page = 0
    }

    if (!orderBy) {
      orderBy = 'name'
    }

    if (!orderType) {
      orderType = 'ASC'
    }

    const patients = await new Patient().query(function(qb) {
      if (name) {
        const nameToSearch = name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toUpperCase()
        qb.where('toSearch', 'ilike', `%${nameToSearch}%`)
      }
      if (outcome) {
        qb.where('outcome', outcome)
      }
      if (bed) {
        qb.where('bed', bed)
      }
      qb.orderBy(orderBy, orderType)
      qb.offset(page * itemsPerPage).limit(itemsPerPage)
    })

    const data = [...(await patients.fetchAll())]
    
    /* get comorbidities hospitaliation reason and nas */
    const p = data.map(async (patient, index) => {
      if (comorbidities) {
        const comorbiditiesPatient = await new ComorbiditiesPatient()
          .where('patientId', patient.attributes.id)
          .fetchAll()

        if (comorbiditiesPatient.length) {
          const comorbiditiesName = comorbiditiesPatient.models.map(
            async comorbidity => {
              const c = await new Comorbidities({
                id: comorbidity.attributes.comorbiditiesId
              }).fetch()
              return c.attributes
            }
          )
          patient.attributes.comorbidities = await Promise.all(
            comorbiditiesName
          )
        }
      }

      if (hospitalizationReason) {
        const hospitalizationReasonPatient = await new HospitalizationReasonPatient()
          .where('patientId', patient.attributes.id)
          .fetchAll()

        if (hospitalizationReasonPatient.length) {
          const hospitalizationReasonName = hospitalizationReasonPatient.models.map(
            async hospitalization => {
              const h = await new HospitalizationReason({
                id: hospitalization.attributes.hospitalizationReasonId
              }).fetch()
              return h.attributes
            }
          )
          patient.attributes.hospitalizationReason = await Promise.all(
            hospitalizationReasonName
          )
        }
      }

      const now = new Date()
      const to = new Date(now.setDate(now.getDate() + 1))

      const nas = await new Nas()
        .where('patientId', patient.attributes.id)
        .where('created_at', '>=', new Date().toLocaleDateString())
        .where('created_at', '<=', to.toLocaleDateString())
        .count()

      return {
        ...patient.attributes,
        dailyNas: parseInt(nas) > 0
      }
    })

    const total = parseInt(await new Patient().count())
    
    return {
      data: await Promise.all(p),
      metadata: {
        total,
        page,
        itemsPerPage
      }
    }
  },

  show: async ctx => {
    const patient = await new Patient({ id: ctx.params.id }).fetch()

    delete patient.attributes.toSearch

    const reasons = await new HospitalizationReasonPatient()
      .where('patientId', ctx.params.id)
      .fetchAll()

    const comorbidities = await new ComorbiditiesPatient()
      .where('patientId', ctx.params.id)
      .fetchAll()

    const now = new Date()
    const to = new Date(now.setDate(now.getDate() + 1))

    const nas = await new Nas()
      .where('patientId', ctx.params.id)
      .where('created_at', '>=', new Date().toLocaleDateString())
      .where('created_at', '<=', to.toLocaleDateString())
      .count()

    return {
      ...patient.attributes,
      hospitalizationReason: reasons.map(
        r => r.attributes.hospitalizationReasonId
      ),
      comorbidities: comorbidities.map(r => r.attributes.comorbiditiesId),
      dailyNas: parseInt(nas) > 0
    }
  },

  create: async ctx => {
    const { body } = ctx.request
    const { hospitalizationReason, comorbidities } = body

    const patient = await new Patient({
      name: body.name,
      birthday: body.birthday,
      toSearch: body.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase(),
      outcome: body.outcome,
      saps3: body.saps3,
      outcomeDate: body.outcomeDate,
      hospitalizationDate: body.hospitalizationDate,
      bed: body.bed
    }).save()

    delete patient.attributes.toSearch

    if (!hospitalizationReason && !comorbidities) {
      return {
        ...patient.attributes,
        hospitalizationReason: [],
        comorbidities: []
      }
    }

    let reasonPatient, comorbiditiesPatient

    if (hospitalizationReason) {
      reasonPatient = hospitalizationReason.map(async r => {
        const reason = await new HospitalizationReasonPatient({
          patientId: patient.attributes.id,
          hospitalizationReasonId: r
        }).save()
        return reason.attributes.hospitalizationReasonId
      })
    }

    if (comorbidities) {
      comorbiditiesPatient = comorbidities.map(async r => {
        const comorbidity = await new ComorbiditiesPatient({
          patientId: patient.attributes.id,
          comorbiditiesId: r
        }).save()
        return comorbidity.attributes.comorbiditiesId
      })
    }

    return {
      ...patient.attributes,
      hospitalizationReason: reasonPatient
        ? await Promise.all(reasonPatient)
        : [],
      comorbidities: comorbiditiesPatient
        ? await Promise.all(comorbiditiesPatient)
        : []
    }
  },

  update: async ctx => {
    const { body } = ctx.request
    const reasons = body.hospitalizationReason
    const comorbidities = body.comorbidities

    const patient = await new Patient({ id: ctx.params.id }).save(
      {
        name: body.name,
        birthday: body.birthday,
        toSearch: body.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toUpperCase(),
        outcome: body.outcome,
        saps3: body.saps3,
        outcomeDate: body.outcomeDate,
        hospitalizationDate: body.hospitalizationDate,
        bed: body.bed
      },
      { method: 'update' }
    )

    delete patient.attributes.toSearch

    const hr = await new HospitalizationReasonPatient()
      .where('patientId', ctx.params.id)
      .fetchAll()

    const cm = await new ComorbiditiesPatient()
      .where('patientId', ctx.params.id)
      .fetchAll()

    let ret = {
      ...patient.attributes
    }

    if (!reasons || !reasons.length) {
      if (hr.length) {
        await new HospitalizationReasonPatient()
          .where('patientId', ctx.params.id)
          .destroy()
      }
      ret.hospitalizationReason = []
    }

    if (!comorbidities || !comorbidities.length) {
      if (cm.length) {
        await new ComorbiditiesPatient()
          .where('patientId', ctx.params.id)
          .destroy()
      }
      ret.comorbidities = []
    }

    if (
      (!reasons || !reasons.length) &&
      (!comorbidities || !comorbidities.length)
    ) {
      return ret
    }

    if (hr.length) {
      const hrResolved = await Promise.all(hr)
      const toBeDeleted = hrResolved.filter(reason => {
        return !reasons.find(
          r => r === reason.attributes.hospitalizationReasonId
        )
      })
      toBeDeleted.map(reason =>
        new HospitalizationReasonPatient({ id: reason.attributes.id }).destroy()
      )
    }

    const reasonPatient = reasons.map(async r => {
      const isExits = await new HospitalizationReasonPatient()
        .where('patientId', ctx.params.id)
        .where('hospitalizationReasonId', r)
        .count()

      if (parseInt(isExits)) {
        return r
      }

      const reason = await new HospitalizationReasonPatient({
        patientId: ctx.params.id,
        hospitalizationReasonId: r
      }).save()
      return reason.attributes.hospitalizationReasonId
    })

    ret.hospitalizationReason = await Promise.all(reasonPatient)

    if (cm.length) {
      const cmResolved = await Promise.all(cm)
      const toBeDeleted = cmResolved.filter(comorbidity => {
        return !comorbidities.find(
          r => r === comorbidity.attributes.comorbiditiesId
        )
      })
      toBeDeleted.map(comorbidity =>
        new ComorbiditiesPatient({ id: comorbidity.attributes.id }).destroy()
      )
    }

    const comorboditiesPatient = comorbidities.map(async c => {
      const isExits = await new ComorbiditiesPatient()
        .where('patientId', ctx.params.id)
        .where('comorbiditiesId', c)
        .count()

      if (parseInt(isExits)) {
        return c
      }

      const comorbidity = await new ComorbiditiesPatient({
        patientId: ctx.params.id,
        comorbiditiesId: c
      }).save()
      return comorbidity.attributes.comorbiditiesId
    })

    ret.comorbidities = await Promise.all(comorboditiesPatient)

    return ret
  },

  destroy: async ctx => {
    const idPatient = ctx.params.id

    const hr = await new HospitalizationReasonPatient()
      .where('patientId', idPatient)
      .count()

    const comorbiditiesPatient = await new ComorbiditiesPatient()
      .where('patientId', idPatient)
      .count()

    const nas = await new Nas().where('patientId', idPatient).count()

    if (parseInt(hr)) {
      new HospitalizationReasonPatient().where('patientId', idPatient).destroy()
    }

    if (parseInt(comorbiditiesPatient)) {
      new ComorbiditiesPatient().where('patientId', idPatient).destroy()
    }

    if (parseInt(nas)) {
      new Nas().where('patientId', idPatient).destroy()
    }

    return new Patient({ id: idPatient }).destroy()
  }
}

export default PatientsController
