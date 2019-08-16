import * as yup from 'yup'
import { isRequired, validEmail, passwordMinLength } from './utils'

export const registerSchema = yup.object().shape({
  name: yup.string().required(isRequired),
  email: validEmail,
  password: yup
    .string()
    .required(isRequired)
    .min(6, passwordMinLength),
})
