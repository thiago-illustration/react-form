export function getError(inputName: string, errors: { [x: string]: any }) {
  const [fieldName, index, propName] = inputName.split('.')
  const foundError = errors[fieldName]

  if (foundError) {
    if (Array.isArray(foundError)) {
      return foundError[+index][propName].message
    }
    return foundError.message
  }
  return ''
}
