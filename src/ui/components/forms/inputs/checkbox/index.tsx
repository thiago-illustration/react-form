import { Checkbox, CheckboxProps, FormControl } from '@chakra-ui/react'

import { useBaseInput } from '../hooks'

interface Props extends Omit<CheckboxProps, 'name'> {
  label: string
  name: string
  optional?: boolean
}

export const CheckboxInput = ({
  name,
  label,
  optional,
  onChange: customOnChange,
  onBlur: customOnBlur,
  ...props
}: Props) => {
  const { inputProps, error } = useBaseInput({
    name,
    customOnBlur,
    customOnChange,
  })

  return (
    <FormControl isRequired={!optional}>
      <Checkbox {...inputProps} {...props}>
        {label}
      </Checkbox>
      {!!error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
    </FormControl>
  )
}
