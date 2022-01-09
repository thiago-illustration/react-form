import { BaseInput, BaseInputProps } from '../base'

export const CardNumberInput = (props: BaseInputProps) => (
  <BaseInput
    mask="cardNumber"
    placeholder="0000 0000 0000 0000"
    label="Card Number"
    type="tel"
    inputMode="numeric"
    autoComplete="cc-number"
    {...props}
  />
)
