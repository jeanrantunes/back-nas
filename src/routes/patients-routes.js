import Router from 'koa-router'

import PatientController from 'controllers/patients-controller'
import PatientValidate from 'validators/patients-schema'

const router = new Router()

router.get('/patients', PatientController.index)

router.post('/patients', PatientValidate.create(), PatientController.create)

router.get('/patients/:id', PatientController.show)
router.put('/patients/:id', PatientValidate.update(), PatientController.update)
router.delete('/patients/:id', PatientController.destroy)

export default router.routes()
