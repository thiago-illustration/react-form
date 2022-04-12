import { object, array, string, boolean, ref } from 'yup'

export const schemas = {
  CA: object({
    autocomplete: string(),
    currency: string().required(),
    cardNumber: string().length(19).required(),
    phone: string().length(14).required(),
    password: string().required(),
    confirmPassword: string()
      .oneOf([ref('password')], 'The passwords must match!')
      .required(),
    colors: array(
      object({
        value: string().required(),
      }),
    ).min(1, 'There should be at least one color!'),
    checkbox: boolean().oneOf([true], 'This is a custom error message'),
  }),
  CO: object({
    autocomplete: string(),
    currency: string(),
    cardNumber: string().length(19),
    phone: string().length(14),
    password: string(),
    confirmPassword: string().oneOf(
      [ref('password')],
      'The passwords must match!',
    ),
    colors: array(
      object({
        value: string(),
      }),
    ).min(1, 'There should be at least one color!'),
    checkbox: boolean().oneOf([true], 'This is a custom error message'),
  }),
  TX: object({
    autocomplete: string().required(),
    currency: string(),
    cardNumber: string().length(19),
    phone: string().length(14),
    password: string().required(),
    confirmPassword: string()
      .oneOf([ref('password')], 'The passwords must match!')
      .required(),
    colors: array(
      object({
        value: string(),
      }),
    ).min(1, 'There should be at least one color!'),
    checkbox: boolean().oneOf([true], 'This is a custom error message'),
  }),
}

export const defaultValues = {
  state: 'CA',
  autocomplete: '',
  currency: '',
  cardNumber: '',
  phone: '',
  password: '',
  confirmPassword: '',
  colors: [{ value: '' }],
  checkbox: false,
}

export type FormData = typeof defaultValues
export type States = keyof typeof schemas
