import * as yup from 'yup'

export const isRequired = 'Dette felt skal udfyldes'

export const invalidEmailMessage = 'Angiv en gyldig emailadresse'

export const passwordMinLength = 'Din kode skal være på mindst 6 tegn'

export const validEmail = yup
  .string()
  .email(invalidEmailMessage)
  .required(isRequired)
