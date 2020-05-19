import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

export const emailToRecoverPassword = async (email, token) => {
  try {
    return await transporter.sendMail({
      from: process.env.SENDER,
      to: email,
      subject: 'Recuperação de senha NAS',
      html: `<h3>Pelo visto você esqueceu sua senha</h3>
                    Clique no link para trocar sua senha <a href="${process.env.HOST}/signup-confirm?passwordToken=${token}">${process.env.HOST}/signup-confirm?passwordToken=${token}</a></p>`
    })
  } catch (err) {
    return err
  }
}

export const welcomeEmail = async (email, inviting, token) => {
  if (!email || !token || !inviting) {
    return
  }
  try {
    return await transporter.sendMail({
      from: process.env.SENDER,
      to: email,
      subject: 'Bem vindo ao NAS',
      html: `<h3>Bem vindo</h3>
            <p>Você recebeu um convite de ${inviting} para participar no NAS.</p>
            <p>Clique aqui para aceitar o convite e finalizar seu cadastro <a href="${process.env.HOST}/signup-confirm?token=${token}">${process.env.HOST}/signup-confirm?token=${token}</a></p>`
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
