import { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { getError } from './utils'
import * as masks from './masks'

type Mask = keyof typeof masks

interface Args {
  name: string
  mask?: Mask
  customOnChange?: React.ChangeEventHandler<HTMLInputElement>
  customOnBlur?: React.FocusEventHandler<HTMLInputElement>
}

export const useBaseInput = ({
  name,
  mask,
  customOnChange,
  customOnBlur,
}: Args) => {
  const { register, formState, clearErrors } = useFormContext()
  const { errors } = formState
  const { onChange, onBlur, ...props } = register(name)

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

  return {
    inputProps: { ...props, onChange: handleChange, onBlur: handleBlur },
    error,
  }
}
