import { Country } from 'types'
import { Flex, Text } from '..'

export const CountryCard = ({
  country,
  onClick,
}: {
  country: Country
  onClick: any
}) => {
  const { flag, name } = country
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
}
