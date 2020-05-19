import bookshelf, { Model } from 'models'
import Patients from './Patients'

const hospitalizationReason = Model({
  tableName: 'hospitalization_reason',
  uuid: true,
  patients: function() {
    return this.belongsToMany(Patients)
  },
  toJSON: function() {
    const hospitalizationReason = bookshelf.Model.prototype.toJSON.apply(
      this,
      arguments
    )
    delete hospitalizationReason.to_search
    return hospitalizationReason
  }
})

export default hospitalizationReason
