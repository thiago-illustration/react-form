import React from 'react'
import { SubmitHandler, FormProvider, UseFormReturn } from 'react-hook-form'

interface Props<T> {
  methods: UseFormReturn<T, object>
  children: React.ReactElement[] | React.ReactElement
  onSubmit: SubmitHandler<T>
}

export function Form<T>({ children, methods, onSubmit }: Props<T>) {
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
