import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

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
import { getError } from '../utils'

export interface BaseInputProps extends ChakraInputProps {
  name: string
  label?: string
  required?: boolean
  mask?: keyof typeof masks
  rightElement?: () => JSX.Element
  leftElement?: () => JSX.Element
  options?: Option[]
}

export function BaseInput({
  name,
  label,
  mask,
  required,
  onChange: customOnChange,
  onBlur: customOnBlur,
  rightElement: RightEl,
  leftElement: LeftEl,
  ...props
}: BaseInputProps) {
  const { register, formState, clearErrors } = useFormContext()
  const { isSubmitting, errors } = formState
  const { onChange, onBlur, ...rest } = register(name)

  const error = useMemo(() => getError(name, errors), [errors])

  const handleChange = useCallback(
    (e) => {
      if (mask) {
        const { value } = e.target
        e.target.value = masks[mask](value)
      }
      if (customOnChange) customOnChange(e)
      if (!!error) clearErrors(name) // Not working :(
      onChange(e)
    },
    [customOnChange, clearErrors, name, mask, error],
  )

  const handleBlur = useCallback(
    (e) => {
      if (customOnBlur) customOnBlur(e)
      onBlur(e)
    },
    [customOnBlur, onBlur],
  )

  return (
    <FormControl isRequired={required}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup size="lg">
        {LeftEl && (
          <InputLeftElement>
            <LeftEl />
          </InputLeftElement>
        )}
        <ChakraInput
          id={name}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={!!error}
          isDisabled={isSubmitting}
          {...rest}
          {...props}
        />
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
