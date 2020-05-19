import bookshelf, { Model } from 'models'

const nas = Model({
  tableName: 'nas',
  hasTimestamps: true,
  toJSON: function() {
    const nas = bookshelf.Model.prototype.toJSON.apply(this, arguments)

    return nas
  }
})

export default nas
