import User from 'models/User'
import bcrypt from 'bcryptjs'
import {
  Unauthorized,
  encryptPassword,
  generateJWTToken,
  sendEmail
} from '../helpers'

const UsersController = {
  login: async ctx => {
    const { body } = ctx.request

    const user = await new User({ email: body.email }).fetch().catch(() => {
      throw Unauthorized('Unauthorized, User not found')
    })

    const isValid = await bcrypt.compare(
      body.password,
      user.attributes.password
    )

    if (!isValid) {
      throw Unauthorized('Unauthorized, password is invalid')
    }

    const parsedUser = user.toJSON()

    return {
      ...parsedUser,
      token: generateJWTToken({ id: parsedUser.id, role: parsedUser.role })
    }
  },

  index: () => new User().fetchAll(),

  show: ctx => new User({ id: ctx.params.id }).fetch(),

  create: async ctx => {
    const { body } = ctx.request

    return new User({
      name: body.name,
      email: body.email,
      password: await encryptPassword(body.password),
      role: body.role
    }).save()
  },

  update: async ctx => {
    const { body } = ctx.request

    return new User({ id: ctx.params.id }).save(
      {
        name: body.name,
        email: body.email,
        password: await encryptPassword(body.password),
        role: body.role
      },
      { method: 'update' }
    )
  },

  destroy: ctx => new User({ id: ctx.params.id }).destroy(),

  generateKey: async ctx => {
    const { body } = ctx.request
    const token = await bcrypt.hash(Math.random().toString(36), 10)

    const user = await new User().where({ email: body.email }).save(
      {
        resetPasswordToken: token,
        // resetPasswordExpires: Date.now() + 360000
        resetPasswordExpires: Date.now() + 360000000
      },
      { method: 'update' }
    )
    const parsedUser = user.toJSON()
    const email = await sendEmail(body.email, token).catch(err => {
      throw new BadRequest(err.toString())
    })

    return { ...parsedUser, response: email.response }
  },

  userByToken: async ctx => {
    const user = await new User()
      .where({
        resetPasswordToken: ctx.query.token
      })
      .where('resetPasswordExpires', '>', Date.now())
      .fetch()

    const parsedUser = user.toJSON()
    return {
      ...parsedUser,
      token: generateJWTToken({
        id: parsedUser.id,
        role: parsedUser.role
      })
    }
  }
}

export default UsersController
