import * as yup from 'yup'
import { validEmail } from './utils'

export const inviteSchema = yup.object().shape({
  email: validEmail,
})
