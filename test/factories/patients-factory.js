import Patients from 'models/Patients'
import { stringGenerator, dateGenerator } from 'helpers'

const patientsFactory = async () => {
  const name = stringGenerator()

  const patient = await new Patients({
    name: name,
    birthday: dateGenerator(),
    outcome: ramdomArray(['pending', 'death', 'discharge']),
    saps_3: Math.floor(Math.random() * (1000 - 0) + 0),
    outcome_date: dateGenerator(new Date(2020, 0, 1), new Date()),
    hospitalization_date: dateGenerator(),
    bed: stringGenerator(1, 'ABCDEF'),
    to_search: name.toUpperCase()
  }).save()

  return patient.attributes
}

export default patientsFactory

const ramdomArray = array => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
