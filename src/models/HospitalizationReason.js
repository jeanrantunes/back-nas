import bookshelf, { Model } from 'models'

const hospitalizationReason = Model({
  tableName: 'hospitalizationReason',
  uuid: true,
  toJSON: function() {
    const hospitalizationReason = bookshelf.Model.prototype.toJSON.apply(
      this,
      arguments
    )

    return hospitalizationReason
  }
})

export default hospitalizationReason
