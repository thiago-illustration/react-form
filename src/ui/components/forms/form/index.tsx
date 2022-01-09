import React from 'react'
import {
  useForm,
  UnpackNestedValue,
  DeepPartial,
  SubmitHandler,
  FormProvider,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AnyObjectSchema } from 'yup'

interface Props<T> {
  defaultValues: UnpackNestedValue<DeepPartial<T>>
  children: React.ReactElement[] | React.ReactElement
  onSubmit: SubmitHandler<T>
  schema: AnyObjectSchema
}

export function Form<T>({
  defaultValues,
  children,
  onSubmit,
  schema,
}: Props<T>) {
  const methods = useForm<T>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          // normalizeFields(data)
          onSubmit(data)
        })}
      >
        {children}
      </form>
    </FormProvider>
  )
}
