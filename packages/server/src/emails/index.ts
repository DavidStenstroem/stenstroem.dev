import Email from 'email-templates'
import nodemailer from 'nodemailer'
import { config } from '../config'
import { join } from 'path'

const { host, port, user, pass } = config.emailConfig
const isProduction = (process.env.NODE_ENV as string) === 'production'

export const transport = nodemailer.createTransport({
  host,
  port,
  secure: true,
  auth: {
    user,
    pass,
  },
})

export const email = new Email({
  transport: isProduction ? transport : { jsonTransport: true },
  send: isProduction,
  message: { from: 'app@stenstroem.dev' },
  juice: true,
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: join(__dirname, './'),
    },
  },
})
