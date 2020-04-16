import Router from 'koa-router'

import ComorbiditiesController from 'controllers/comorbidities-controller'
import ComorbiditiesValidade from 'validators/comorbidities-schema'

const router = new Router()

router.get('/comorbidities', ComorbiditiesController.index)

router.post(
  '/comorbidity',
  ComorbiditiesValidade.create(),
  ComorbiditiesController.create
)

router.get('/comorbidity/:id', ComorbiditiesController.show)
router.put(
  '/comorbidity/:id',
  ComorbiditiesValidade.update(),
  ComorbiditiesController.update
)
router.delete('/comorbidity/:id', ComorbiditiesController.destroy)

export default router.routes()
