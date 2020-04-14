import bookshelf, { Model } from 'models'

const comorbidities = Model({
  tableName: 'comorbidities',
  uuid: true,
  toJSON: function() {
    const comorbidities = bookshelf.Model.prototype.toJSON.apply(
      this,
      arguments
    )

    return comorbidities
  }
})

export default comorbidities
