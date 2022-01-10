import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

import * as masks from '../masks'
import { Option } from '../types'
import { useBaseInput } from '../hooks'

export interface BaseInputProps extends ChakraInputProps {
  name: string
  label?: string
  optional?: boolean
  mask?: keyof typeof masks
  rightElement?: () => JSX.Element
  leftElement?: () => JSX.Element
  options?: Option[]
}

export function BaseInput({
  name,
  label,
  mask,
  optional,
  onChange: customOnChange,
  onBlur: customOnBlur,
  rightElement: RightEl,
  leftElement: LeftEl,
  ...props
}: BaseInputProps) {
  const { inputProps, error } = useBaseInput({
    name,
    mask,
    customOnBlur,
    customOnChange,
  })

  return (
    <FormControl isRequired={!optional}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup size="lg">
        {LeftEl && (
          <InputLeftElement>
            <LeftEl />
          </InputLeftElement>
        )}
        <ChakraInput id={name} isInvalid={!!error} {...inputProps} {...props} />
        {RightEl && (
          <InputRightElement>
            <RightEl />
          </InputRightElement>
        )}
      </InputGroup>
      {!!error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
    </FormControl>
  )
}
