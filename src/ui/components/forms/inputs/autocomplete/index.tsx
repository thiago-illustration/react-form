import React, { useCallback, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Box,
  Spinner,
  SlideFade,
} from '@chakra-ui/react'

import { getError } from '../utils'

interface AutocompleteInputProps<T> extends ChakraInputProps {
  name: string
  required?: boolean
  label?: string
  render?: (data: T, onClick: (value: string) => void) => React.ReactElement
  fetchFn?: (value: string) => T[] | Promise<T[]>
}

export function AutocompleteInput<T>({
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
