import { object, array, string } from 'yup'

export const schema = object({
  currency: string().required(),
  cardNumber: string().length(19).required(),
  phone: string().length(14).required(),
  password: string().required(),
  colors: array(
    object({
      value: string().required(),
    }),
  ).min(1, 'There should be at least one color!'),
})

export const defaultValues = {
  currency: '',
  cardNumber: '',
  phone: '',
  password: '',
  colors: [{ value: '' }],
}

export type FormData = typeof defaultValues
