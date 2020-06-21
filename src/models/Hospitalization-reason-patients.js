import bookshelf, { Model } from 'models'
import Patients from './Patients'
import HospitalizationReason from './Hospitalization-reason'

const hospitalizationReasonPatients = Model({
  tableName: 'hr_patients',
  toJSON: function() {
    const hospitalizationReasonPatients = bookshelf.Model.prototype.toJSON.apply(
      this,
      arguments
    )

    return hospitalizationReasonPatients
  }
})

export default hospitalizationReasonPatients
