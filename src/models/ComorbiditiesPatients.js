import bookshelf, { Model } from 'models'
import Patients from './Patients'
import Comorbidities from './Comorbidities'

const comorbiditiesPatients = Model({
  tableName: 'comorbiditiesPatients',
  uuid: true,
  comorbidities: function() {
    return this.belongsTo(Comorbidities)
  },
  patients: function() {
    return this.belongsTo(Patients)
  },
  toJSON: function() {
    const comorbiditiesPatients = bookshelf.Model.prototype.toJSON.apply(
      this,
      arguments
    )

    return comorbiditiesPatients
  }
})

export default comorbiditiesPatients
