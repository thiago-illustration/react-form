export async function fetchCountries(countryName: string) {
  const url = `https://restcountries.com/v3.1/name/${countryName}`
  const res = await fetch(url)
  const data = await res.json()
  return data
}
