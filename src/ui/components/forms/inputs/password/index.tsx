import { useState } from 'react'
import { Eye, EyeOff } from 'react-feather'
import { IconButton } from '@chakra-ui/react'

import { BaseInput, BaseInputProps } from '../base'

export const PasswordInput = (props: BaseInputProps) => {
  const [show, setShow] = useState(false)

  return (
    <BaseInput
      type={show ? 'text' : 'password'}
      label="Password"
      rightElement={() => (
        <IconButton
          variant="ghost"
          icon={show ? <EyeOff /> : <Eye />}
          onClick={() => setShow((prev) => !prev)}
          aria-label="show"
        />
      )}
      {...props}
    />
  )
}
