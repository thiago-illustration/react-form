import { useMemo } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { Trash2, Plus } from 'react-feather'

import {
  FormControl,
  FormLabel,
  Button,
  IconButton,
  Flex,
  Stack,
} from '@chakra-ui/react'

import { BaseInput, BaseInputProps } from '../base'
import { getError } from '../utils'

export const FiledArrayInput = ({ name, label }: BaseInputProps) => {
  const { control, formState, clearErrors } = useFormContext()
  const { errors } = formState
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name,
    },
  )

  const error = useMemo(() => getError(name, errors ?? {}), [name, errors])

  return (
    <FormControl>
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
      {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
    </FormControl>
  )
}
