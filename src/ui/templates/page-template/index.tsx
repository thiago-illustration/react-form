import { Heading, Container } from '../..'

interface Props {
  children: React.ReactElement
  title: string
}

export const PageTemplate = ({ children, title }: Props) => (
  <Container pt="80px">
    <Heading mb="40px">{title}</Heading>
    {children}
  </Container>
)
