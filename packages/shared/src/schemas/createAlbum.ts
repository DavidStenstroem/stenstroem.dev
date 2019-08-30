import * as yup from 'yup'
import { isRequired } from './utils'

export const createAlbumSchema = yup.object().shape(
  {
    title: yup
      .string()
      .required(isRequired)
      .min(3, 'Titlen er for kort - den skal være på mindst tre tegn')
      .max(30, 'Title er for lang - den må maks. være på 30 tegn'),
    description: yup
      .string()
      .nullable()
      .notRequired(),

    media: yup.array().when('files', {
      is: (files) => !files,
      then: yup
        .array()
        .of(yup.string())
        .required('Du skal vælge eller uploade mindst én fil'),
    }),
    files: yup.array().when('media', {
      is: (media) => !media,
      then: yup
        .array()
        .required('Du skal vælge eller uploade mindst én fil')
        .test(
          'is-too-big',
          'Denne fil er for stor. Maks. størrelsen er 25MB',
          (files?: File[]): boolean => {
            let valid = true
            if (files) {
              files.map((file) => {
                const size = file.size / 1024 / 1024
                if (size > 25) {
                  valid = false
                }
              })
            }
            return valid
          }
        ),
    }),
  },
  [['media', 'files']]
)
