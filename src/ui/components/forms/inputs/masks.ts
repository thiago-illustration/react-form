export const currency = (value: string) => {
  return `$ ${value
    .replace(/\D/g, '')
    .replace(/(\d)(\d{2})$/g, '$1,$2')
    .replace(/(?=(\d{3})+(\D))\B/g, '.')}`
}

export const cardNumber = (value: string) => {
  return (
    value
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      ?.join(' ')
      .substring(0, 19) || ''
  )
}

export const phone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d{3})(\d{4})/g, '($1) $2-$3')
    .substring(0, 14)
}
