import uuidv4 from 'uuid/v4'

import { encryptPassword } from '../../helpers/password'

export const seed = async knex => {
  await knex('users').del()
  await knex('users').insert([
    {
      id: uuidv4(),
      name: 'Jean Antunes',
      email: 'jeanrantunes93@gmail.com',
      password: await encryptPassword('12345'),
      role: 'ADMIN',
      created_at: new Date(),
      updated_at: new Date()
    }
  ])
  const uidPatient1 = uuidv4()
  const uidPatient2 = uuidv4()
  const uidPatient3 = uuidv4()
  const uidPatient4 = uuidv4()
  const uidPatient5 = uuidv4()
  const uidPatient6 = uuidv4()
  const uidPatient7 = uuidv4()

  await knex('patients').insert([
    {
      id: uidPatient1,
      name: 'Seu Zé',
      hospitalizationDate: new Date(),
      birthday: new Date('06/07/1993'),
      bed: 'A'
    },
    {
      id: uidPatient2,
      name: 'Dona Maria',
      outcome: 'death',
      hospitalizationDate: new Date('2020-03-07T14:55:00.000Z'),
      bed: 'B'
    },
    {
      id: uidPatient7,
      name: 'Maria Luiza',
      birthday: new Date('06/25/1763'),
      hospitalizationDate: new Date('2020-04-07T14:55:00.000Z'),
      bed: 'B'
    },
    {
      id: uidPatient3,
      name: 'Seu Jorge',
      birthday: new Date('06/25/1933'),
      hospitalizationDate: new Date('2020-04-07T14:55:00.000Z'),
      bed: 'C'
    },
    {
      id: uidPatient4,
      name: 'José Luiz',
      birthday: new Date('06/25/1936'),
      hospitalizationDate: new Date('2020-04-07T14:55:00.000Z'),
      bed: 'D'
    },
    {
      id: uidPatient5,
      name: 'Neymar',
      birthday: new Date('06/25/1963'),
      hospitalizationDate: new Date('2020-04-07T14:55:00.000Z'),
      bed: 'E'
    },
    {
      id: uidPatient6,
      name: 'Seu Paulo',
      birthday: new Date('06/25/1863'),
      hospitalizationDate: new Date('2020-04-07T14:55:00.000Z'),
      bed: 'F'
    }
  ])
  const uidReason1 = uuidv4()
  const uidReason2 = uuidv4()
  const uidReason3 = uuidv4()
  const uidReason4 = uuidv4()
  const uidReason5 = uuidv4()
  const uidReason6 = uuidv4()
  await knex('hospitalizationReason').insert([
    {
      id: uidReason1,
      name: 'Sepse'
    },
    {
      id: uidReason2,
      name: 'Cirrose'
    },
    {
      id: uidReason3,
      name: 'Linfoma Não Hodgkin'
    },
    {
      id: uidReason4,
      name: 'Insuficiência respiratória'
    },
    {
      id: uidReason5,
      name: 'Infecção respiratória'
    },
    {
      id: uidReason6,
      name: 'Derrame Pleural'
    }
  ])

  await knex('hospitalizationReasonPatients').insert([
    {
      id: uuidv4(),
      patientId: uidPatient1,
      hospitalizationReasonId: uidReason1
    },
    {
      id: uuidv4(),
      patientId: uidPatient2,
      hospitalizationReasonId: uidReason1
    },
    {
      id: uuidv4(),
      patientId: uidPatient2,
      hospitalizationReasonId: uidReason2
    },
    {
      id: uuidv4(),
      patientId: uidPatient2,
      hospitalizationReasonId: uidReason5
    },
    {
      id: uuidv4(),
      patientId: uidPatient2,
      hospitalizationReasonId: uidReason6
    },
    {
      id: uuidv4(),
      patientId: uidPatient1,
      hospitalizationReasonId: uidReason2
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
      name: 'Neoplasia pulmonar'
    },
    {
      id: uidComorbidities2,
      name: 'Tabagismo'
    },
    {
      id: uidComorbidities3,
      name: 'Linfoma'
    },
    {
      id: uidComorbidities4,
      name: 'HAS'
    },
    {
      id: uidComorbidities5,
      name: 'Bicitopenia'
    },
    {
      id: uidComorbidities6,
      name: 'ICC'
    }
  ])

  await knex('comorbiditiesPatients').insert([
    {
      id: uuidv4(),
      patientId: uidPatient1,
      comorbiditiesId: uidComorbidities3
    },
    {
      id: uuidv4(),
      patientId: uidPatient2,
      comorbiditiesId: uidComorbidities3
    },
    {
      id: uuidv4(),
      patientId: uidPatient2,
      comorbiditiesId: uidComorbidities6
    },
    {
      id: uuidv4(),
      patientId: uidPatient2,
      comorbiditiesId: uidComorbidities4
    },
    {
      id: uuidv4(),
      patientId: uidPatient2,
      comorbiditiesId: uidComorbidities5
    },
    {
      id: uuidv4(),
      patientId: uidPatient1,
      comorbiditiesId: uidComorbidities6
    }
  ])

  await knex('nas').insert([
    {
      id: uuidv4(),
      patientId: uidPatient1,
      monitoringAndControls: '1a',
      laboratoryInvestigations: false,
      medicationExceptVasoactiveDrugs: true,
      hygieneProcedures: '4a',
      caringForDrains: true,
      mobilizationAndPositioning: '6a',
      supportAndCare: '7a',
      administrativeAndManagerialTasks: '8a',
      ventilatorySupport: false,
      lungFunction: false,
      vasoactiveDrugs: false,
      intravenousReplacement: false,
      monitoringOfTheLeftAtrium: false,
      cardiorespiratoryResumption: false,
      hemofiltrationTechniques: false,
      urineOutput: false,
      intracranialPressure: false,
      acidosisTreatment: false,
      intravenousHyperalimentation: false,
      enteralFeeding: false,
      specificInterventionsInTheUnit: false,
      specificInterventionsOutsideTheUnit: true
    },
    {
      id: uuidv4(),
      patientId: uidPatient2,
      monitoringAndControls: '1a',
      laboratoryInvestigations: false,
      medicationExceptVasoactiveDrugs: true,
      hygieneProcedures: '4a',
      caringForDrains: true,
      mobilizationAndPositioning: '6b',
      supportAndCare: '7a',
      administrativeAndManagerialTasks: '8b',
      ventilatorySupport: false,
      lungFunction: true,
      vasoactiveDrugs: false,
      intravenousReplacement: true,
      monitoringOfTheLeftAtrium: true,
      cardiorespiratoryResumption: false,
      hemofiltrationTechniques: false,
      urineOutput: false,
      intracranialPressure: false,
      acidosisTreatment: false,
      intravenousHyperalimentation: false,
      enteralFeeding: true,
      specificInterventionsInTheUnit: false,
      specificInterventionsOutsideTheUnit: false
    }
  ])
}
