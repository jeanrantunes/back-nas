import HospitalizationReason from 'models/Hospitalization-reason'
import { stringGenerator } from 'helpers'

const hospitalizationReasonFactory = async () => {
  const name = stringGenerator()
  const hospitalizationReason = await new HospitalizationReason({
    name: name,
    to_search: name.toUpperCase()
  }).save()

  return hospitalizationReason.attributes
}

export default hospitalizationReasonFactory
