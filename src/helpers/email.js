import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

export const sendEmail = async (email, token) => {
  try {
    return await transporter.sendMail({
      from: process.env.SENDER,
      to: email,
      subject: 'Link para reset da senha do NAS',
      html: `<h3>Você esqueceu sua senha</h3>
                    Clique no link para trocar sua senha <a href="${process.env.HOST}/recover-password?token=${token}">${process.env.HOST}/reset-password?token=${token}</a>`
    })
  } catch (err) {
    return err
  }
}

export const welcomeEmail = async (email, token) => {
  try {
    return await transporter.sendMail({
      from: process.env.SENDER,
      to: email,
      subject: 'Bem vindo ao canvas',
      html: `<h3>Bem vindo ao canvas</h3>
                    Clique aqui para confirmar seu cadastro <a href="${process.env.HOST}/signup-confirm?token=${token}">${process.env.HOST}/signup-confirm?token=${token}</a>`
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
