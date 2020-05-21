import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

export const emailToRecoverPassword = async (name, email, token) => {
  try {
    return await transporter.sendMail({
      from: process.env.SENDER,
      to: email,
      subject: 'Recuperação de senha NAS',
      html: `<p>Olá <b>${name}</b>, pelo visto você esqueceu sua senha.</p>
      <p>Clique no link para cadastrar uma nova senha <a href="${process.env.HOST}/signup-confirm?password_token=${token}">${process.env.HOST}/signup-confirm?password_token=${token}</a></p>`
    })
  } catch (err) {
    return err
  }
}

export const welcomeEmail = async (name, email, inviting, token) => {
  if (!email || !token || !inviting) {
    return
  }
  try {
    return await transporter.sendMail({
      from: process.env.SENDER,
      to: email,
      subject: 'Bem vindo ao NAS',
      html: `<h3>Bem vindo</h3>
            <p>Olá <b>${name}</b>, você recebeu um convite de ${inviting} para participar no NAS.</p>
            <p>Clique no link para aceitar o convite e finalizar seu cadastro <a href="${process.env.HOST}/signup-confirm?token=${token}">${process.env.HOST}/signup-confirm?token=${token}</a></p>`
    })
  } catch (err) {
    return err
  }
}

export const feedbackEmail = async (email, msg) => {
  try {
    return await transporter.sendMail({
      from: process.env.SENDER,
      to: 'jeanrantunes93@gmail.com',
      subject: `Feedback de ${email} sobre o canvas`,
      html: msg
    })
  } catch (err) {
    return err
  }
}
