import { BaseInput, BaseInputProps } from '../base'

export const PhoneInput = (props: BaseInputProps) => (
  <BaseInput
    mask="phone"
    placeholder="(000) 000-0000"
    label="Phone"
    type="tel"
    inputMode="numeric"
    autoComplete="cc-number"
    {...props}
  />
)
