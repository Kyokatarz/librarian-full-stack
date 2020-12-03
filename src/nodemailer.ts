import nodemailer from 'nodemailer'

type overrideObject = {
  subject: string;
  text: string;
}

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'libraryoct2020@outlook.com',
    pass: 'ItDoesn\'tMatter',
  },
})

export default function (
  receiver: string,
  hashedString: string,
  override?: overrideObject
) {
  let options = {
    from: 'libraryoct2020@outlook.com',
    to: receiver,
    subject: 'Reset Password Request',
    html: `<div><a href="http://localhost:5000/recoverpassword/${hashedString}"> Click here to reset your password.</a> Your link is valid for 5 mins.</div>`,
  }

  if (override) options = { ...options, ...override }

  transporter.sendMail(options, (err: any, info: any) => {
    if (err) {
      throw err
    }
  })
}
