import request from 'supertest'

import app from 'server'
import { DatabaseTest } from 'helpers'
import UserFactory from 'test/factories/users-factory'
import HospitalizationReasonFactory from 'test/factories/hospitalizationReason-factory'

describe('TEST COMORBIDITIES', () => {
  beforeEach(async () => {
    await DatabaseTest.createDB()
    global.server = app.listen()
    global.user = await UserFactory()
    global.hospitalizationReason = await HospitalizationReasonFactory()
  })

  afterEach(async () => {
    await DatabaseTest.destroyDB()
    global.server.close()
  })

  describe('POST /v1/hospitalization-reason', () => {
    test('should create a new hospitalization reason', async () => {
      const response = await request(global.server)
        .post('/v1/hospitalization-reason')
        .set('Authorization', global.user.token)
        .send({
          name: 'Some hospitalization reason'
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name'])
      )
    })
  })

  describe('GET /v1/hospitalization-reason', () => {
    test('should return a list of comorbidities', async () => {
      const response = await request(global.server)
        .get('/v1/hospitalization-reason')
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body.data[0])).toEqual(
        expect.arrayContaining(['id', 'name'])
      )
    })
  })

  describe('GET /v1/hospitalization-reason/:id', () => {
    test('should return a hospitalization reason', async () => {
      const response = await request(global.server)
        .get(`/v1/hospitalization-reason/${global.hospitalizationReason.id}`)
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining(['id', 'name'])
      )
    })
  })

  describe('PUT /v1/hospitalization-reason/:id', () => {
    test('should update a hospitalization reason', async () => {
      const response = await request(global.server)
        .put(`/v1/hospitalization-reason/${global.hospitalizationReason.id}`)
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

  describe('DELETE /v1/hospitalization-reason/:id', () => {
    test('should delete a hospitalization reason', async () => {
      const response = await request(global.server)
        .delete(`/v1/hospitalization-reason/${global.hospitalizationReason.id}`)
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
