import * as yup from 'yup'
import { isRequired } from './utils'

export const createAlbumSchema = yup.object().shape({
  title: yup
    .string()
    .required(isRequired)
    .min(3, 'Titlen er for kort - den skal være på mindst tre tegn')
    .max(30, 'Title er for lang - den må maks. være på 30 tegn'),
  description: yup
    .string()
    .nullable()
    .notRequired(),
  media: yup
    .array()
    .of(yup.string())
    .required(isRequired)
    .max(5, 'Du kan højst uploade 5 emner ad gangen'),
})
