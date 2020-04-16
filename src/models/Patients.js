import bookshelf, { Model } from 'models'

const patient = Model({
  tableName: 'patients',
  uuid: true,
  toJSON: function() {
    const patient = bookshelf.Model.prototype.toJSON.apply(this, arguments)

    delete patient.toSearch
    return patient
  }
})

export default patient
