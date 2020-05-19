import Comorbidities from 'models/Comorbidities'
import { stringGenerator } from 'helpers'

const comorbidityFactory = async () => {
  const name = stringGenerator()
  const comorbidity = await new Comorbidities({
    name: name,
    to_search: name.toUpperCase()
  }).save()

  return comorbidity.attributes
}

export default comorbidityFactory
