import * as yup from 'yup'
import { isRequired, passwordMinLength } from './utils'

export const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required(isRequired),
  newPassword: yup
    .string()
    .min(6, passwordMinLength)
    .required(isRequired),
})
