import bookshelf, { Model } from 'models'
import Patients from './Patients'
import Comorbidities from './Comorbidities'

const comorbiditiesPatients = Model({
  tableName: 'comorbidities_patients',
  toJSON: function() {
    const comorbiditiesPatients = bookshelf.Model.prototype.toJSON.apply(
      this,
      arguments
    )

    return comorbiditiesPatients
  }
})

export default comorbiditiesPatients
