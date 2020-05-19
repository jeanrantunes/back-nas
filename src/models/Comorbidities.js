import bookshelf, { Model } from 'models'
import Patients from './Patients'

const comorbidities = Model({
  tableName: 'comorbidities',
  uuid: true,
  patients: function() {
    return this.belongsToMany(Patients)
  },
  toJSON: function() {
    const comorbidities = bookshelf.Model.prototype.toJSON.apply(
      this,
      arguments
    )
    delete comorbidities.to_search
    return comorbidities
  }
})

export default comorbidities
