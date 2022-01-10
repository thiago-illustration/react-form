import { useCallback, useState } from 'react'

import { defaultValues, schema, FormData } from './forms'
import { Country } from './types'
import { fetchCountries } from './services'
import { Form, Input, Stack, Button, PageTemplate, CountryCard } from './ui'

const App = () => {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback((data: FormData) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log(data)
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <PageTemplate title="Form Page">
      <Form defaultValues={defaultValues} onSubmit={onSubmit} schema={schema}>
        <Stack direction="column" spacing="20px" mb="64px">
          <Input.Autocomplete<Country>
            name="autocomplete"
            placeholder="Find a Country"
            label="Country"
            fetchFn={fetchCountries}
            render={({ data, onClick }) => (
              <CountryCard country={data} onClick={onClick} />
            )}
          />
          <Input.Currency name="currency" />
          <Input.CardNumber name="cardNumber" />
          <Input.Phone name="phone" />
          <Input.Password name="password" />
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
