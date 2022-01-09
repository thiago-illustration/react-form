import React, { useCallback, useMemo, useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { Eye, EyeOff, Trash2, Plus } from 'react-feather'

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Flex,
  Box,
  Spinner,
  SlideFade,
  Stack,
} from '@chakra-ui/react'

import * as masks from './masks'

type InputVariants =
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

type Option = {
  value: string | number
  label: string
}

interface BaseProps extends ChakraInputProps {
  name: string
  label?: string
  required?: boolean
  mask?: keyof typeof masks
  rightElement?: () => JSX.Element
  leftElement?: () => JSX.Element
  options?: Option[]
}

function getError(inputName: string, errors: { [x: string]: any }) {
  const [fieldName, index, propName] = inputName.split('.')
  const foundError = errors[fieldName]

  if (foundError) {
    if (Array.isArray(foundError)) {
      return foundError[+index][propName].message
    }
    return foundError.message
  }
  return ''
}

// ==============================================================================
// Base Input

function BaseInput({
  name,
  label,
  mask,
  required,
  onChange: customOnChange,
  onBlur: customOnBlur,
  rightElement: RightEl,
  leftElement: LeftEl,
  ...props
}: BaseProps) {
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

// ==============================================================================
// Phone Input

const PhoneInput = (props: BaseProps) => (
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

// ==============================================================================
// Card Number Input

const CardNumberInput = (props: BaseProps) => (
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

// ==============================================================================
// Currency Input

const CurrencyInput = (props: BaseProps) => (
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

// ==============================================================================
// Password Input

const PasswordInput = (props: BaseProps) => {
  const [show, setShow] = useState(false)

  return (
    <BaseInput
      type={show ? 'text' : 'password'}
      label="Password"
      rightElement={() => (
        <IconButton
          variant="ghost"
          icon={show ? <EyeOff /> : <Eye />}
          onClick={() => setShow((prev) => !prev)}
          aria-label="show"
        />
      )}
      {...props}
    />
  )
}

// ==============================================================================
// Field Array

const FiledArrayInput = ({ name, label, required }: BaseProps) => {
  const { control, formState, clearErrors } = useFormContext()
  const { errors } = formState
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name,
    },
  )

  const error = useMemo(() => getError(name, errors), [errors])

  return (
    <FormControl isRequired={required}>
      {label && <FormLabel>{label}</FormLabel>}
      {fields.length ? (
        <Stack>
          {fields.map((field, index) => (
            <Flex key={field.id} alignItems="center" gap="20px">
              <BaseInput
                name={`${name}.${index}.value`}
                placeholder="New color"
                rightElement={() => (
                  <IconButton
                    icon={<Trash2 />}
                    colorScheme="red"
                    variant="ghost"
                    aria-label="Remove"
                    onClick={() => remove(index)}
                  />
                )}
              />
            </Flex>
          ))}
        </Stack>
      ) : (
        <p>No colors :(</p>
      )}
      <Button
        mt="20px"
        size="sm"
        variant="outline"
        leftIcon={<Plus />}
        onClick={() => {
          append({ value: '' })
          clearErrors(name) // Not working :(
        }}
      >
        Add Color
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </FormControl>
  )
}

// ==============================================================================
// Autocomplete Input

interface AutocompleteInputProps<T> extends ChakraInputProps {
  name: string
  required?: boolean
  label?: string
  render?: (data: T, onClick: (value: string) => void) => React.ReactElement
  fetchFn?: (value: string) => T[] | Promise<T[]>
}

function AutocompleteInput<T>({
  render,
  fetchFn,
  name,
  required,
  label,
  ...props
}: AutocompleteInputProps<T>) {
  const [items, setItems] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { register, formState, setValue } = useFormContext()
  const { onChange, ...rest } = register(name)
  const { errors } = formState

  const error = useMemo(() => getError(name, errors), [errors])

  const fetchItems = useCallback(async (value: string) => {
    setIsLoading(true)
    const result = await fetchFn!(value)
    setItems(result ?? [])
    setIsLoading(false)
  }, [])

  const handleClick = useCallback((value: string) => {
    setValue(name, value)
    setItems([])
  }, [])

  const handleChange = useCallback(
    (e) => {
      const { value } = e.target
      if (value.length % 3 === 0) {
        fetchItems(value)
      }
      onChange(e)
    },
    [onChange, fetchItems],
  )

  return (
    <Box position="relative">
      <FormControl isRequired={required}>
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        <InputGroup size="lg">
          <ChakraInput
            id={name}
            isInvalid={!!error}
            {...rest}
            {...props}
            onChange={handleChange}
          />
          {isLoading && (
            <InputRightElement>
              <Spinner size="sm" />
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
      <SlideFade in={!!items.length}>
        <Box
          position="absolute"
          zIndex="dropdown"
          bg="white"
          w="100%"
          mt="1"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="8px"
          boxShadow="lg"
        >
          {items.map((item) => render!(item, handleClick))}
        </Box>
      </SlideFade>
    </Box>
  )
}

// ==============================================================================
// Input

interface InputProps extends BaseProps, AutocompleteInputProps<any> {
  variant: InputVariants
}

export const Input = ({ variant, ...props }: InputProps) => {
  const inputs: { [key: string]: (props: any) => JSX.Element } = {
    cardNumber: CardNumberInput,
    currency: CurrencyInput,
    phone: PhoneInput,
    fieldArray: FiledArrayInput,
    password: PasswordInput,
    text: BaseInput,
    autocomplete: AutocompleteInput,
  }

  const InputEl = inputs[variant]
  return <InputEl {...props} />
}
