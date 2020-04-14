import Router from 'koa-router'
import users from './users-router'
import patients from './patients-routes'
import hospitalizationReason from './hospitalizationReason-routes'
import comorbidities from './comorbidities-routes'
import nas from './nas-routes'
import me from './me-router'

const router = new Router()
const api = new Router()

api.use(users)
api.use(me)
api.use(patients)
api.use(hospitalizationReason)
api.use(comorbidities)
api.use(nas)

router.use('/v1', api.routes())

export default router
