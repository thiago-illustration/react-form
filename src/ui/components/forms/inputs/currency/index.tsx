import { BaseInput, BaseInputProps } from '../base'

export const CurrencyInput = (props: BaseInputProps) => (
  <BaseInput
    mask="currency"
    placeholder="$ 0,00"
    label="Currency"
    type="tel"
    inputMode="numeric"
    autoComplete="cc-number"
    {...props}
  />
)
