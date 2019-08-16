import { ValidationError } from 'yup'
import { FormError } from '../types/graphql'

export const formatError = (err: ValidationError): FormError[] => {
  const errors: FormError[] = []
  err.inner.forEach((e): void => {
    errors.push({
      path: e.path,
      message: e.message,
    })
  })
  return errors
}
