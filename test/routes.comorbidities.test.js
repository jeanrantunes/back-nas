import request from 'supertest'

import app from 'server'
import { DatabaseTest } from 'helpers'
import UserFactory from 'test/factories/users-factory'
import ComorbidityFactory from 'test/factories/comorbidities-factory'

describe('TEST COMORBIDITIES', () => {
  beforeEach(async () => {
    await DatabaseTest.createDB()
    global.server = app.listen()
    global.user = await UserFactory()
    global.comorbidity = await ComorbidityFactory()
  })

  afterEach(async () => {
    await DatabaseTest.destroyDB()
    global.server.close()
  })

  describe('POST /v1/comorbidity', () => {
    test('should create a new comorbidity', async () => {
      const response = await request(global.server)
        .post('/v1/comorbidity')
        .set('Authorization', global.user.token)
        .send({
          name: 'Some Comorbidity'
        })
      console.log(response.body)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name'])
      )
    })
  })

  describe('GET /v1/comorbidities', () => {
    test('should return a list of comorbidities', async () => {
      const response = await request(global.server)
        .get('/v1/comorbidities')
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body.data[0])).toEqual(
        expect.arrayContaining(['id', 'name'])
      )
    })
  })

  describe('GET /v1/comorbidity/:id', () => {
    test('should return a comorbidity', async () => {
      const response = await request(global.server)
        .get(`/v1/comorbidity/${global.comorbidity.id}`)
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name'])
      )
    })
  })

  describe('PUT /v1/comorbidity/:id', () => {
    test('should update a comorbidity', async () => {
      const response = await request(global.server)
        .put(`/v1/comorbidity/${global.comorbidity.id}`)
        .set('Authorization', global.user.token)
        .send({
          name: 'User Test Update'
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name'])
      )
    })
  })

  describe('DELETE /v1/comorbidity/:id', () => {
    test('should delete a comorbidity', async () => {
      const response = await request(global.server)
        .delete(`/v1/comorbidity/${global.comorbidity.id}`)
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          'name',
          'message',
          'deleted',
          'statusCode',
          'errorCode'
        ])
      )
    })
  })
})
