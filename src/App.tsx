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
          <Input
            name="autocomplete"
            variant="autocomplete"
            placeholder="Find a Country"
            label="Country"
            fetchFn={fetchCountries}
            required
            render={(item, onClick) => {
              const { flag, name } = item
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
          <Input name="currency" variant="currency" required />
          <Input name="cardNumber" variant="cardNumber" required />
          <Input name="phone" variant="phone" required />
          <Input name="password" variant="password" required />
          <Input name="colors" label="Colors" variant="fieldArray" required />
        </Stack>

        <Button type="submit" colorScheme="purple" isLoading={isLoading}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default App
