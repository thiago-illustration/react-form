import { useCallback, useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

import { defaultValues, schemas, FormData, States } from './forms'
import { Country } from './types'
import { fetchCountries } from './services'
import {
  Form,
  Input,
  useForm,
  Stack,
  Button,
  PageTemplate,
  CountryCard,
  StateSelector,
} from './ui'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState<States>('CA')

  const methods = useForm({
    defaultValues,
    schema: schemas[state],
  })

  const toast = useToast()
  const amount = methods.watch('currency')

  const onSubmit = useCallback((data: FormData) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log(data)
      setIsLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    const normalized = amount.replace(/\$|\./g, '').replace(',', '.')
    if (+normalized > 10000) {
      toast({ title: 'The amount is over $10.000,00!', status: 'info' })
    }
  }, [amount])

  return (
    <PageTemplate title="Form Page">
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack direction="column" spacing="20px" mb="64px">
          <StateSelector
            selected={state}
            onSelect={(value) => setState(value)}
          />

          <Input.Autocomplete<Country>
            name="country"
            placeholder="Find a Country"
            label="Country"
            fetchFn={fetchCountries}
            render={({ data, onClick }) => (
              <CountryCard
                country={data}
                onClick={onClick}
                key={data.name.official}
              />
            )}
          />
          <Input.Currency name="currency" />
          <Input.CardNumber name="cardNumber" />
          <Input.Phone name="phone" />
          <Input.Password name="password" />
          <Input.Password name="confirmPassword" label="Confirm Password" />
          <Input.FiledArray name="colors" label="Colors" />
          <Input.Checkbox name="checkbox" label="This is a checkbox" />
        </Stack>

        <Button type="submit" colorScheme="purple" isLoading={isLoading}>
          Submit
        </Button>
      </Form>
    </PageTemplate>
  )
}

export default App
