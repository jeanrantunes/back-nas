import bookshelf, { Model } from 'models'
import Patients from './Patients'
import HospitalizationReason from './Hospitalization-reason'

const hospitalizationReasonPatients = Model({
  tableName: 'hospitalization_reason_patients',
  // uuid: true,
  hospitalization_reason: function() {
    return this.belongsTo(HospitalizationReason)
  },
  patients: function() {
    return this.belongsTo(Patients)
  },
  toJSON: function() {
    const hospitalizationReasonPatients = bookshelf.Model.prototype.toJSON.apply(
      this,
      arguments
    )

    return hospitalizationReasonPatients
  }
})

export default hospitalizationReasonPatients
