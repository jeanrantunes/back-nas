import bookshelf, { Model } from 'models'
import Comorbidities from './Comorbidities'
import HospitalizationReason from './Hospitalization-reason'
import Nas from './Nas'

const patient = Model({
  tableName: 'patients',
  uuid: true,
  comorbidities: function() {
    return this.belongsToMany(Comorbidities)
  },
  hospitalization_reason: function() {
    return this.belongsToMany(HospitalizationReason)
  },
  nas: function() {
    return this.hasMany(Nas)
  },
  toJSON: function() {
    const patient = bookshelf.Model.prototype.toJSON.apply(this, arguments)

    delete patient.to_search
    return patient
  }
})

export default patient
