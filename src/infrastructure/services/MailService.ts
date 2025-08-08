import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: Number(process.env.SMTP_PORT) || 587, 
  secure: process.env.SMTP_SECURE === 'true', 
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    const info = await transporter.sendMail({
      from: `"Berço Pantaneiro" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    })
    console.log('📧 Email enviado:', info.messageId)
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error)
  }
}
