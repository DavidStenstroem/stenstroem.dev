import * as yup from 'yup'
import { validEmail, isRequired } from './utils'

export const loginSchema = yup.object().shape({
  email: validEmail,
  password: yup.string().required(isRequired),
})
