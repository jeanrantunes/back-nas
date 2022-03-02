import uuidv4 from 'uuid/v4'

import { encryptPassword } from '../../helpers/password'

export const seed = async knex => {
  await knex('users').del()
  await knex('users').insert([
    {
      id: uuidv4(),
      name: 'Jean Antunes',
      email: 'jeanrantunes93@gmail.com',
      password: await encryptPassword('Fohu0059'),
      role: 'ADMIN',
      created_at: new Date(),
      updated_at: new Date()
    }
  ])
  const uidPatient1 = uuidv4()
  const namePatient1 = 'Seu Zé'
  const uidPatient2 = uuidv4()
  const namePatient2 = 'Dona Maria'
  const uidPatient3 = uuidv4()
  const uidPatient4 = uuidv4()
  const uidPatient5 = uuidv4()
  const uidPatient6 = uuidv4()
  const uidPatient7 = uuidv4()

  await knex('patients').insert([
    {
      id: uidPatient1,
      name: namePatient1,
      to_search: 'SEU ZE',
      hospitalization_date: new Date(),
      birthday: new Date('06/07/1993'),
      bed: 'A',
      origin: 'ps'
    },
    {
      id: uidPatient2,
      name: namePatient2,
      to_search: 'DONA MARIA',
      outcome: 'death',
      hospitalization_date: new Date('2020-03-07T14:55:00.000Z'),
      bed: 'B',
      origin: 'ps'
    },
    {
      id: uidPatient7,
      name: 'Maria Luiza',
      to_search: 'MARIA LUIZA',
      birthday: new Date('06/25/1763'),
      hospitalization_date: new Date('2020-04-07T14:55:00.000Z'),
      bed: 'B',
      origin: 'ps'
    },
    {
      id: uidPatient3,
      name: 'Seu Jorge',
      to_search: 'SEU JORGE',
      birthday: new Date('06/25/1933'),
      hospitalization_date: new Date('2020-04-07T14:55:00.000Z'),
      bed: 'C',
      origin: 'ps'
    },
    {
      id: uidPatient4,
      name: 'José Luiz',
      to_search: 'JOSE LUIZ',
      birthday: new Date('06/25/1936'),
      hospitalization_date: new Date('2020-04-07T14:55:00.000Z'),
      bed: 'D',
      origin: 'ps'
    },
    {
      id: uidPatient5,
      name: 'Neymar',
      to_search: 'NEYMAR',
      birthday: new Date('06/25/1963'),
      hospitalization_date: new Date('2020-04-07T14:55:00.000Z'),
      bed: 'E',
      origin: 'ps'
    },
    {
      id: uidPatient6,
      name: 'Seu Paulo',
      to_search: 'SEU PAULO',
      birthday: new Date('06/25/1863'),
      hospitalization_date: new Date('2020-04-07T14:55:00.000Z'),
      bed: 'F',
      origin: 'ps'
    }
  ])
  const uidReason1 = uuidv4()
  const uidReason2 = uuidv4()
  const uidReason3 = uuidv4()
  const uidReason4 = uuidv4()
  const uidReason5 = uuidv4()
  const uidReason6 = uuidv4()
  await knex('hr').insert([
    {
      id: uidReason1,
      name: 'Sepse',
      to_search: 'SEPSE'
    },
    {
      id: uidReason2,
      name: 'Cirrose',
      to_search: 'CIRROSE'
    },
    {
      id: uidReason3,
      name: 'Linfoma Não Hodgkin',
      to_search: 'LINFOMA NAO HODGKIN'
    },
    {
      id: uidReason4,
      name: 'Insuficiência respiratória',
      to_search: 'INSUFICIENCIA RESPIRATORIA'
    },
    {
      id: uidReason5,
      name: 'Infecção respiratória',
      to_search: 'SEU PAULO'
    },
    {
      id: uidReason6,
      name: 'Derrame Pleural',
      to_search: 'DERRAME PLEURAL'
    }
  ])

  await knex('hr_patients').insert([
    {
      // id: uuidv4(),
      patient_id: uidPatient1,
      hr_id: uidReason1
    },
    {
      // id: uuidv4(),
      patient_id: uidPatient2,
      hr_id: uidReason1
    },
    {
      // id: uuidv4(),
      patient_id: uidPatient2,
      hr_id: uidReason2
    },
    {
      // id: uuidv4(),
      patient_id: uidPatient2,
      hr_id: uidReason5
    },
    {
      // id: uuidv4(),
      patient_id: uidPatient2,
      hr_id: uidReason6
    },
    {
      // id: uuidv4(),
      patient_id: uidPatient1,
      hr_id: uidReason2
    }
  ])
  const uidComorbidities1 = uuidv4()
  const uidComorbidities2 = uuidv4()
  const uidComorbidities3 = uuidv4()
  const uidComorbidities4 = uuidv4()
  const uidComorbidities5 = uuidv4()
  const uidComorbidities6 = uuidv4()
  await knex('comorbidities').insert([
    {
      id: uidComorbidities1,
      name: 'Neoplasia pulmonar',
      to_search: 'NEOPLASIA PULMONAR'
    },
    {
      id: uidComorbidities2,
      name: 'Tabagismo',
      to_search: 'TABAGISMO'
    },
    {
      id: uidComorbidities3,
      name: 'Linfoma',
      to_search: 'LINFOMA'
    },
    {
      id: uidComorbidities4,
      name: 'HAS',
      to_search: 'HAS'
    },
    {
      id: uidComorbidities5,
      name: 'Bicitopenia',
      to_search: 'BICITOPENIA'
    },
    {
      id: uidComorbidities6,
      name: 'ICC',
      to_search: 'ICC'
    }
  ])

  await knex('comorbidities_patients').insert([
    {
      // id: uuidv4(),
      patient_id: uidPatient1,
      comorbidity_id: uidComorbidities3
    },
    {
      // id: uuidv4(),
      patient_id: uidPatient2,
      comorbidity_id: uidComorbidities3
    },
    {
      // id: uuidv4(),
      patient_id: uidPatient2,
      comorbidity_id: uidComorbidities6
    },
    {
      // id: uuidv4(),
      patient_id: uidPatient2,
      comorbidity_id: uidComorbidities4
    },
    {
      // id: uuidv4(),
      patient_id: uidPatient2,
      comorbidity_id: uidComorbidities5
    },
    {
      // id: uuidv4(),
      patient_id: uidPatient1,
      comorbidity_id: uidComorbidities6
    }
  ])
  // for (let i = 0; i < 1000; i++) {
  //   await knex('nas').insert([
  //     {
  //       // id: uuidv4(),
  //       patient_id: uidPatient1,
  //       monitoring_and_controls: '1a',
  //       laboratory_investigations: false,
  //       medication_except_vasoactive_drugs: true,
  //       hygiene_procedures: '4a',
  //       caring_for_drains: true,
  //       mobilization_and_positioning: '6a',
  //       support_and_care: '7a',
  //       administrative_and_managerial_tasks: '8a',
  //       ventilatory_support: false,
  //       lung_function: false,
  //       artificial_airways: true,
  //       vasoactive_drugs: false,
  //       intravenous_replacement: false,
  //       monitoring_of_the_left_atrium: false,
  //       cardiorespiratory_resumption: false,
  //       hemofiltration_techniques: false,
  //       urine_output: false,
  //       intracranial_pressure: false,
  //       acidosis_treatment: false,
  //       intravenous_hyperalimentation: false,
  //       enteral_feeding: false,
  //       specific_interventions_in_the_unit: false,
  //       specific_interventions_outside_the_unit: true,
  //       nas_date: new Date(),
  //       created_at: new Date(),
  //       updated_at: new Date()
  //     },
  //     {
  //       // id: uuidv4(),
  //       patient_id: uidPatient2,
  //       monitoring_and_controls: '1a',
  //       laboratory_investigations: false,
  //       medication_except_vasoactive_drugs: true,
  //       hygiene_procedures: '4a',
  //       caring_for_drains: true,
  //       mobilization_and_positioning: '6b',
  //       support_and_care: '7a',
  //       administrative_and_managerial_tasks: '8b',
  //       ventilatory_support: false,
  //       lung_function: true,
  //       artificial_airways: false,
  //       vasoactive_drugs: false,
  //       intravenous_replacement: true,
  //       monitoring_of_the_left_atrium: true,
  //       cardiorespiratory_resumption: false,
  //       hemofiltration_techniques: false,
  //       urine_output: false,
  //       intracranial_pressure: false,
  //       acidosis_treatment: false,
  //       intravenous_hyperalimentation: false,
  //       enteral_feeding: true,
  //       specific_interventions_in_the_unit: false,
  //       specific_interventions_outside_the_unit: false,
  //       nas_date: new Date(),
  //       created_at: new Date(),
  //       updated_at: new Date()
  //     }
  //   ])
  // }
}
