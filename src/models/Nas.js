import bookshelf, { Model } from 'models'
import Patients from './Patients'

const nas = Model({
  tableName: 'nas',
  // uuid: true,
  hasTimestamps: true,
  patients: function() {
    return this.belongsTo(Patients)
  },
  toJSON: function() {
    const nas = bookshelf.Model.prototype.toJSON.apply(this, arguments)

    return nas
  }
})

export default nas
