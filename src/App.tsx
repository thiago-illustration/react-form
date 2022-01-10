import { useCallback, useState } from 'react'
import { object, array, string } from 'yup'

import {
  Form,
  Input,
  Stack,
  Button,
  Heading,
  Container,
  Flex,
  Text,
} from './ui'

const schema = object({
  currency: string().required(),
  cardNumber: string().length(19).required(),
  phone: string().length(14).required(),
  password: string().required(),
  colors: array(
    object({
      value: string().required(),
    }),
  ).min(1, 'There should be at least one color!'),
})

const defaultValues = {
  currency: '',
  cardNumber: '',
  phone: '',
  password: '',
  colors: [{ value: '' }],
}

type FormData = typeof defaultValues
type Country = { flag: string; name: { official: string } }

const App = () => {
  const [isLoading, setIsLoading] = useState(false)

  const fetchCountries = useCallback(async (countryName: string) => {
    const url = `https://restcountries.com/v3.1/name/${countryName}`
    const res = await fetch(url)
    const data = await res.json()
    return data
  }, [])

  const onSubmit = useCallback((data: FormData) => {
    setIsLoading(true)
    setTimeout(() => {
      console.log(data)
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <Container pt="80px">
      <Heading mb="40px">Form Page</Heading>

      <Form defaultValues={defaultValues} onSubmit={onSubmit} schema={schema}>
        <Stack direction="column" spacing="20px" mb="64px">
          <Input.Autocomplete<Country>
            name="autocomplete"
            placeholder="Find a Country"
            label="Country"
            fetchFn={fetchCountries}
            render={({ data, onClick }) => {
              const { flag, name } = data
              return (
                <Flex
                  key={name.official}
                  py="2"
                  px="3"
                  alignItems="center"
                  cursor="pointer"
                  onClick={() => onClick(name.official)}
                  _hover={{ bg: 'gray.100' }}
                >
                  <Text mr="4">{flag}</Text>
                  <Text>{name.official}</Text>
                </Flex>
              )
            }}
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
    </Container>
  )
}

export default App
