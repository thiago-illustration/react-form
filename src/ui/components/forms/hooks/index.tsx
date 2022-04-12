import { useMemo, useEffect } from 'react'
import {
  DeepPartial,
  UnpackNestedValue,
  useForm as useRHFForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AnyObjectSchema } from 'yup'

interface Props<T> {
  schema: AnyObjectSchema
  defaultValues: UnpackNestedValue<DeepPartial<T>>
}

export function useForm<T>({ schema, defaultValues }: Props<T>) {
  const methods = useRHFForm<T>({
    defaultValues: useMemo(() => defaultValues, [defaultValues]),
    resolver: useMemo(() => schema && yupResolver(schema), [schema]),
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    methods.reset(defaultValues)
  }, [defaultValues, methods])

  return methods
}
