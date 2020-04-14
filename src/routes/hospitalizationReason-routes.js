import Router from 'koa-router'

import HospitalizationReasonController from 'controllers/hospitalizationReason-controller'
import HospitalizationReasonValidade from 'validators/hospitalizationReason-schema'

const router = new Router()

router.get('/hospitalization-reason', HospitalizationReasonController.index)

router.post(
  '/hospitalization-reason',
  HospitalizationReasonValidade.create(),
  HospitalizationReasonController.create
)

router.get('/hospitalization-reason/:id', HospitalizationReasonController.show)
router.put(
  '/hospitalization-reason/:id',
  HospitalizationReasonValidade.update(),
  HospitalizationReasonController.update
)
router.delete(
  '/hospitalization-reason/:id',
  HospitalizationReasonController.destroy
)

export default router.routes()
