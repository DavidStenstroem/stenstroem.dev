import * as yup from 'yup'
import { isRequired } from './utils'

export const changeNameSchema = yup.object().shape({
  newName: yup.string().required(isRequired),
})
