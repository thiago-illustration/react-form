export type InputVariants =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'checkbox'
  | 'option'
  | 'radio'
  | 'phone'
  | 'currency'
  | 'autocomplete'
  | 'date'
  | 'time'
  | 'cardNumber'
  | 'select'
  | 'upload'
  | 'search'
  | 'pin'
  | 'range'
  | 'fieldArray'

export type Option = {
  value: string | number
  label: string
}
