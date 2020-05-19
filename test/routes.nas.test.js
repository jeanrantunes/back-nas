import request from 'supertest'

import app from 'server'
import { DatabaseTest } from 'helpers'
import UserFactory from 'test/factories/users-factory'
import PatientsFactory from 'test/factories/patients-factory'
import NasFactory from 'test/factories/nas-factory'

describe('TEST NAS', () => {
  beforeEach(async () => {
    await DatabaseTest.createDB()
    global.server = app.listen()
    global.user = await UserFactory()
    global.patient = await PatientsFactory()
    global.nas = await NasFactory(global.patient.id)
  })

  afterEach(async () => {
    await DatabaseTest.destroyDB()
    global.server.close()
  })

  describe('POST /v1/nas', () => {
    test('should create a new nas', async () => {
      const response = await request(global.server)
        .post('/v1/nas')
        .set('Authorization', global.user.token)
        .send({
          patient_id: global.patient.id,
          monitoring_and_controls: '1a',
          laboratory_investigations: true,
          medication_except_vasoactive_drugs: false,
          hygiene_procedures: '4a',
          caring_for_drains: false,
          mobilization_and_positioning: '6b',
          support_and_care: '7a',
          administrative_and_managerial_tasks: '8a',
          ventilatory_support: true,
          lung_function: false,
          artificial_airways: false,
          vasoactive_drugs: true,
          intravenous_replacement: false,
          monitoring_of_the_left_atrium: false,
          cardiorespiratory_resumption: true,
          hemofiltration_techniques: true,
          urine_output: true,
          intracranial_pressure: true,
          acidosis_treatment: true,
          intravenous_hyperalimentation: true,
          enteral_feeding: false,
          specific_interventions_in_the_unit: true,
          specific_interventions_outside_the_unit: true,
          nas_date: new Date()
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          'id',
          'patient_id',
          'monitoring_and_controls',
          'laboratory_investigations',
          'medication_except_vasoactive_drugs',
          'hygiene_procedures',
          'caring_for_drains',
          'mobilization_and_positioning',
          'support_and_care',
          'administrative_and_managerial_tasks',
          'ventilatory_support',
          'lung_function',
          'artificial_airways',
          'vasoactive_drugs',
          'intravenous_replacement',
          'monitoring_of_the_left_atrium',
          'cardiorespiratory_resumption',
          'hemofiltration_techniques',
          'urine_output',
          'intracranial_pressure',
          'acidosis_treatment',
          'intravenous_hyperalimentation',
          'enteral_feeding',
          'specific_interventions_in_the_unit',
          'specific_interventions_outside_the_unit',
          'nas_date'
        ])
      )
    })
  })

  describe('GET /v1/nas', () => {
    test('should return a list of nas', async () => {
      const response = await request(global.server)
        .get('/v1/nas')
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body.data[0])).toEqual(
        expect.arrayContaining([
          'id',
          'patient_id',
          'monitoring_and_controls',
          'laboratory_investigations',
          'medication_except_vasoactive_drugs',
          'hygiene_procedures',
          'caring_for_drains',
          'mobilization_and_positioning',
          'support_and_care',
          'administrative_and_managerial_tasks',
          'ventilatory_support',
          'lung_function',
          'artificial_airways',
          'vasoactive_drugs',
          'intravenous_replacement',
          'monitoring_of_the_left_atrium',
          'cardiorespiratory_resumption',
          'hemofiltration_techniques',
          'urine_output',
          'intracranial_pressure',
          'acidosis_treatment',
          'intravenous_hyperalimentation',
          'enteral_feeding',
          'specific_interventions_in_the_unit',
          'specific_interventions_outside_the_unit',
          'nas_date'
        ])
      )
    })
  })

  describe('GET /v1/nas/:id', () => {
    test('should return a nas', async () => {
      const response = await request(global.server)
        .get(`/v1/nas/${global.nas.id}`)
        .set('Authorization', global.user.token)
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          'id',
          'patient_id',
          'monitoring_and_controls',
          'laboratory_investigations',
          'medication_except_vasoactive_drugs',
          'hygiene_procedures',
          'caring_for_drains',
          'mobilization_and_positioning',
          'support_and_care',
          'administrative_and_managerial_tasks',
          'ventilatory_support',
          'lung_function',
          'artificial_airways',
          'vasoactive_drugs',
          'intravenous_replacement',
          'monitoring_of_the_left_atrium',
          'cardiorespiratory_resumption',
          'hemofiltration_techniques',
          'urine_output',
          'intracranial_pressure',
          'acidosis_treatment',
          'intravenous_hyperalimentation',
          'enteral_feeding',
          'specific_interventions_in_the_unit',
          'specific_interventions_outside_the_unit',
          'nas_date'
        ])
      )
    })
  })

  describe('PUT /v1/nas/:id', () => {
    test('should update a hospitalization reason', async () => {
      const response = await request(global.server)
        .put(`/v1/nas/${global.nas.id}`)
        .set('Authorization', global.user.token)
        .send({
          patient_id: global.patient.id,
          monitoring_and_controls: '1a',
          laboratory_investigations: true,
          medication_except_vasoactive_drugs: false,
          hygiene_procedures: '4a',
          caring_for_drains: false,
          mobilization_and_positioning: '6b',
          support_and_care: '7a',
          administrative_and_managerial_tasks: '8a',
          ventilatory_support: false,
          lung_function: false,
          artificial_airways: false,
          vasoactive_drugs: false,
          intravenous_replacement: false,
          monitoring_of_the_left_atrium: false,
          cardiorespiratory_resumption: false,
          hemofiltration_techniques: false,
          urine_output: false,
          intracranial_pressure: false,
          acidosis_treatment: false,
          intravenous_hyperalimentation: false,
          enteral_feeding: false,
          specific_interventions_in_the_unit: false,
          specific_interventions_outside_the_unit: false,
          nas_date: new Date()
        })
      expect(response.status).toEqual(200)
      expect(response.type).toEqual('application/json')
      expect(Object.keys(response.body)).toEqual(
        expect.arrayContaining([
          'id',
          'patient_id',
          'monitoring_and_controls',
          'laboratory_investigations',
          'medication_except_vasoactive_drugs',
          'hygiene_procedures',
          'caring_for_drains',
          'mobilization_and_positioning',
          'support_and_care',
          'administrative_and_managerial_tasks',
          'ventilatory_support',
          'lung_function',
          'artificial_airways',
          'vasoactive_drugs',
          'intravenous_replacement',
          'monitoring_of_the_left_atrium',
          'cardiorespiratory_resumption',
          'hemofiltration_techniques',
          'urine_output',
          'intracranial_pressure',
          'acidosis_treatment',
          'intravenous_hyperalimentation',
          'enteral_feeding',
          'specific_interventions_in_the_unit',
          'specific_interventions_outside_the_unit',
          'nas_date'
        ])
      )
    })
  })

  describe('DELETE /v1/nas/:id', () => {
    test('should delete a nas', async () => {
      const response = await request(global.server)
        .delete(`/v1/nas/${global.nas.id}`)
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
