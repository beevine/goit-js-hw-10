const BASIC_URL = 'https://restcountries.com/v3.1/name/';
const FILTER_SEARCH = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${BASIC_URL}${name}?${FILTER_SEARCH}`)
    .then(response => response.json())
    .catch(error => console.log(error));
}
