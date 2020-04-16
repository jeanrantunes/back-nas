import Router from 'koa-router'

import NasController from 'controllers/nas-controller'
import NasValidade from 'validators/nas-schema'

const router = new Router()

router.get('/nas', NasController.index)

router.post('/nas', NasValidade.create(), NasController.create)

router.get('/nas/:id', NasController.show)
router.put('/nas/:id', NasValidade.update(), NasController.update)
router.delete('/nas/:id', NasController.destroy)

export default router.routes()
