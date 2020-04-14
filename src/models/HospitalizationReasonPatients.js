import bookshelf, { Model } from 'models'
import HospitalizationReason from './hospitalizationReason'
import Patients from './Patients'

const hospitalizationReasonPatients = Model({
  tableName: 'hospitalizationReasonPatients',
  uuid: true,
  hospitalizationReason: function() {
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
