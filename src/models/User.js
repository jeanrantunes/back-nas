import bookshelf, { Model } from 'models'

const user = Model({
  tableName: 'users',
  uuid: true,
  toJSON: function() {
    const { password, ...user } = bookshelf.Model.prototype.toJSON.apply(
      this,
      arguments
    )

    delete user.password
    delete user.resetPasswordToken
    delete user.resetPasswordExpires

    return user
  }
})

export default user
