import { useCallback, useState, useEffect } from 'react'
import { object, array, string, ref } from 'yup'
import { useToast } from '@chakra-ui/react'

import { Form, Input, Stack, Button, Heading, Container } from './ui'

const schema = object({
  currency: string().required(),
  cardNumber: string().length(19).required(),
  phone: string().length(14).required(),
  password: string().required(),
  confirmPassword: string()
    .oneOf([ref('password')], 'The passwords must match!')
    .required(),
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
  confirmPassword: '',
  colors: [{ value: '' }],
}

type FormData = typeof defaultValues

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const toast = useToast()

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
    <Container pt="80px">
      <Heading mb="40px">Form Page</Heading>

      <Form defaultValues={defaultValues} onSubmit={onSubmit} schema={schema}>
        <Stack direction="column" spacing="20px" mb="64px">
          <Input
            name="currency"
            variant="currency"
            required
            onChange={({ target }) => setAmount(target.value)}
          />
          <Input name="cardNumber" variant="cardNumber" required />
          <Input name="phone" variant="phone" required />
          <Input name="password" variant="password" required />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            variant="password"
            required
          />
          <Input
            name="colors"
            label="Favorite Colors"
            variant="fieldArray"
            required
          />
        </Stack>

        <Button type="submit" colorScheme="purple" isLoading={isLoading}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default App
