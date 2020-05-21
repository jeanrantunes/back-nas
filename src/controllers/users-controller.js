import User from 'models/User'
import bcrypt from 'bcryptjs'
import {
  Unauthorized,
  encryptPassword,
  generateJWTToken,
  emailToRecoverPassword,
  welcomeEmail
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
    const { name, email, role, inviting } = body
    const token = await bcrypt.hash(Math.random().toString(36), 10)

    const user = await new User({
      name: name,
      email: email,
      // password: await encryptPassword(.password),
      role: role,
      signup_token: token
    }).save()

    welcomeEmail(name, email, inviting, token)

    return user
  },

  update: async ctx => {
    const { body } = ctx.request

    return new User({ id: ctx.params.id }).save(
      {
        name: body.name,
        email: body.email,
        password: await encryptPassword(body.password),
        reset_password_token: null,
        role: body.role,
        signup_token: null
      },
      { method: 'update' }
    )
  },

  destroy: ctx => new User({ id: ctx.params.id }).destroy(),

  updateByToken: async ctx => {
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

  userByTokenConfirm: async ctx => {
    const user = await new User()
      .where({
        signup_token: ctx.query.token
      })
      .fetch()
      .catch(() => {
        throw Unauthorized('Unauthorized, User not found')
      })

    const parsedUser = user.toJSON()
    return {
      ...parsedUser,
      token: generateJWTToken({ id: parsedUser.id, role: parsedUser.role })
    }
  },

  generateKey: async ctx => {
    const { body } = ctx.request
    const token = await bcrypt.hash(Math.random().toString(36), 10)

    const user = await new User()
      .where({ email: body.email })
      .save(
        {
          reset_password_token: token,
          reset_password_expires: Date.now() + 360000
        },
        { method: 'update' }
      )
      .catch(err => {
        console.log(err)
        throw Unauthorized('Unauthorized, User not found')
      })
    const parsedUser = user.toJSON()
    const email = await emailToRecoverPassword(
      parsedUser.name,
      body.email,
      token
    ).catch(err => {
      throw new BadRequest(err.toString())
    })

    return { success: true, response: email.response }
  },

  userByToken: async ctx => {
    const user = await new User()
      .where({
        reset_password_token: ctx.query.token
      })
      .where('reset_password_expires', '>', Date.now())
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
