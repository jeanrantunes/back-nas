import request from 'supertest'

import app from 'server'
import { DatabaseTest, plusOneDay } from 'helpers'
import UserFactory from 'test/factories/users-factory'
import ComorbidityFactory from 'test/factories/comorbidities-factory'
import HospitalizationReasonFactory from 'test/factories/hospitalizationReason-factory'
import PatientsFactory from 'test/factories/patients-factory'

describe('TEST PATIENTS', () => {
  beforeEach(async () => {
    await DatabaseTest.createDB()
    global.server = app.listen()
    global.user = await UserFactory()
    global.patient = await PatientsFactory()
  })

  afterEach(async () => {
    await DatabaseTest.destroyDB()
    global.server.close()
  })

  describe('POST /v1/patients', () => {
    test('should create a new patient', async () => {
      const comorbidity1 = await ComorbidityFactory()
      const comorbidity2 = await ComorbidityFactory()
      const comorbidity3 = await ComorbidityFactory()
      const hr1 = await HospitalizationReasonFactory()
      const hr2 = await HospitalizationReasonFactory()
      const response = await request(global.server)
        .post('/v1/patients')
        .set('Authorization', global.user.token)
        .send({
          name: 'Some Comorbidity',
          birthday: new Date(1969, 0, 1),
          outcome: 'death',
          origin: 'ps',
          saps_3: 100,
          comorbidities: [comorbidity1.id, comorbidity2.id, comorbidity3.id],
          hospitalization_reason: [hr1.id, hr2.id],
          outcome_date: new Date(2020, 0, 1),
          hospitalization_date: new Date(2020, 0, 2),
          bed: 'A'
        })
      console.log(response.body)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          'id',
          'name',
          'birthday',
          'outcome',
          'origin',
          'saps_3',
          'comorbidities',
          'hospitalization_reason',
          'outcome_date',
          'hospitalization_date',
          'bed'
        ])
      )
    })
  })

  describe('GET /v1/patients', () => {
    test('should return a list of patients', async () => {
      const response = await request(global.server)
        .get('/v1/patients')
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body.data[0])).toEqual(
        expect.arrayContaining([
          'id',
          'name',
          'birthday',
          'outcome',
          'origin',
          'saps_3',
          'outcome_date',
          'hospitalization_date',
          'bed'
        ])
      )
    })
  })

  describe('GET /v1/patients?comorbidities=true&hospitalization_reason=true', () => {
    test('should return a list of patients with comorbidities and hospitalization reasons', async () => {
      const response = await request(global.server)
        .get('/v1/patients?comorbidities=true&hospitalization_reason=true')
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body.data[0])).toEqual(
        expect.arrayContaining([
          'id',
          'name',
          'birthday',
          'outcome',
          'origin',

          'saps_3',
          'comorbidities',
          'hospitalization_reason',
          'outcome_date',
          'hospitalization_date',
          'bed'
        ])
      )
    })
  })

  describe('GET /v1/patients?name', () => {
    test('should return a list of patients filtered by name', async () => {
      const response = await request(global.server)
        .get(`/v1/patients?name=${global.patient.name}`)
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body.data[0])).toEqual(
        expect.arrayContaining([
          'id',
          'name',
          'birthday',
          'outcome',
          'origin',

          'saps_3',
          'outcome_date',
          'hospitalization_date',
          'bed'
        ])
      )
    })
  })

  describe('GET /v1/patients?outcome', () => {
    test('should return a list of patients filtered by outcome', async () => {
      const response = await request(global.server)
        .get(`/v1/patients?outcome=${global.patient.outcome}`)
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body.data[0])).toEqual(
        expect.arrayContaining([
          'id',
          'name',
          'birthday',
          'outcome',
          'origin',

          'saps_3',
          'outcome_date',
          'hospitalization_date',
          'bed'
        ])
      )
    })
  })

  describe('GET /v1/patients?bed', () => {
    test('should return a list of patients filtered by bed', async () => {
      const response = await request(global.server)
        .get(`/v1/patients?bed=${global.patient.bed}`)
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body.data[0])).toEqual(
        expect.arrayContaining([
          'id',
          'name',
          'birthday',
          'outcome',
          'origin',

          'saps_3',
          'outcome_date',
          'hospitalization_date',
          'bed'
        ])
      )
    })
  })

  describe('GET /v1/patients?hospitalization_start_date&hospitalization_end_date', () => {
    test('should return a list of patients filtered between hospitalization_start_date and hospitalization_end_date', async () => {
      const response = await request(global.server)
        .get(
          `/v1/patients?hospitalization_start_date=${new Date(
            global.patient.hospitalization_date
          ).toLocaleDateString()}&hospitalization_end_date=${plusOneDay(
            global.patient.hospitalization_date
          ).toLocaleDateString()}`
        )
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body.data[0])).toEqual(
        expect.arrayContaining([
          'id',
          'name',
          'birthday',
          'outcome',
          'origin',

          'saps_3',
          'outcome_date',
          'hospitalization_date',
          'bed'
        ])
      )
    })
  })

  describe('GET /v1/patients?outcome_start_date&outcome_end_date', () => {
    test('should return a list of patients filtered between outcome_start_date and outcome_end_date', async () => {
      const response = await request(global.server)
        .get(
          `/v1/patients?outcome_start_date=${new Date(
            global.patient.outcome_date
          ).toLocaleDateString()}&outcome_end_date=${plusOneDay(
            global.patient.outcome_date
          ).toLocaleDateString()}`
        )
        .set('Authorization', global.user.token)

      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body.data[0])).toEqual(
        expect.arrayContaining([
          'id',
          'name',
          'birthday',
          'outcome',
          'origin',

          'saps_3',
          'outcome_date',
          'hospitalization_date',
          'bed'
        ])
      )
    })
  })

  // describe('GET /v1/patients?dailyNas', () => {
  //   test('should return a list of patients with latest nas', async () => {
  //     const response = await request(global.server)
  //       .get('/v1/patients?dailyNas=true')
  //       .set('Authorization', global.user.token)
  //     expect(response.status).toEqual(200)
  //     expect(response.type).toEqual('application/json')
  //     expect(Object.keys(response.body.data[0])).toEqual(
  //       expect.arrayContaining([
  //         'id',
  //         'name',
  //         'birthday',
  //         'outcome',
  //         'saps_3',
  //         'outcomeDate',
  //         'hospitalizationDate',
  //         'bed',
  //         'nas'
  //       ])
  //     )
  //   })
  // })

  describe('GET /v1/patients/:id', () => {
    test('should return a patient', async () => {
      const response = await request(global.server)
        .get(`/v1/patients/${global.patient.id}`)
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          'id',
          'name',
          'birthday',
          'outcome',
          'origin',

          'saps_3',
          'outcome_date',
          'hospitalization_date',
          'bed',
          'comorbidities',
          'hospitalization_reason',
          'daily_nas'
        ])
      )
    })
  })

  describe('PUT /v1/patients/:id', () => {
    test('should update a patient', async () => {
      const comorbidity1 = await ComorbidityFactory()
      const comorbidity2 = await ComorbidityFactory()
      const hr1 = await HospitalizationReasonFactory()
      const response = await request(global.server)
        .put(`/v1/patients/${global.patient.id}`)
        .set('Authorization', global.user.token)
        .send({
          name: 'Some patient update',
          birthday: new Date(1969, 0, 1),
          origin: 'ps',
          outcome: 'discharge',
          saps_3: 310,
          comorbidities: [comorbidity1.id, comorbidity2.id],
          hospitalization_reason: [hr1.id],
          outcome_date: new Date(2019, 0, 1),
          hospitalization_date: new Date(2010, 0, 2),
          bed: 'C'
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          'id',
          'name',
          'birthday',
          'outcome',
          'origin',

          'saps_3',
          'comorbidities',
          'hospitalization_reason',
          'outcome_date',
          'hospitalization_date',
          'bed'
        ])
      )
    })
  })

  describe('DELETE /v1/patients/:id', () => {
    test('should delete a patient', async () => {
      const response = await request(global.server)
        .delete(`/v1/patients/${global.patient.id}`)
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
