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
import { useBaseInput } from '../hooks'

export interface BaseInputProps extends ChakraInputProps {
  name: string
  label?: string
  mask?: keyof typeof masks
  rightElement?: () => JSX.Element
  leftElement?: () => JSX.Element
}

export function BaseInput({
  name,
  label,
  mask,
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
    <FormControl>
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
