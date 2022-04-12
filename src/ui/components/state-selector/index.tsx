import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button, Stack } from '@chakra-ui/react'

import { States } from '../../../forms'

interface Props {
  selected?: States
  onSelect: (selected: States) => void
}

const states: States[] = ['CA', 'CO', 'TX']

export const StateSelector = ({ selected = 'CA', onSelect }: Props) => {
  const { setValue } = useFormContext()

  const getProps = useCallback(
    (name: string) => {
      const isSelected = selected === name
      return {
        key: name,
        variant: isSelected ? 'solid' : 'outline',
        colorScheme: 'purple',
        onClick: () => onSelect(name as States),
      }
    },
    [onSelect],
  )

  useEffect(() => {
    setValue('state', selected)
  }, [selected])

  return (
    <Stack direction="row" spacing="6">
      {states.map((s) => (
        <Button {...getProps(s)}>{s}</Button>
      ))}
    </Stack>
  )
}
