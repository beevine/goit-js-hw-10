import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  // evt.preventDefault();
  const name = refs.input.value.trim();
  if (name === '') return;
  fetchCountries(name).then(createMarkup).catch(onError);
}

function createMarkup(countries) {
  clearMarkup();
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    displayList(countries);
  } else if (countries.length === 1) {
    displayCountry(countries);
  }
}

function onError() {
  Notify.failure('Oops, there is no country with that name');
}

function displayList(countries) {
  clearMarkup();
  const markup = countries
    .map(({ name, flags }) => {
      return `<li class="country-list_item" style="display: flex; margin-bottom: 20px; align-items: center; gap:25px;">
        <img src=${flags.svg} alt=${name.official} class="country-list_flag" width = 100/>
        <p class="country-list_name">${name.official}</p>
        </li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

function displayCountry(countries) {
  const markup = `<p><img src="${countries[0].flags.svg}"alt="Flag ${
    countries[0].name.official
  }"style="display: block" width = 250/><b> ${
    countries[0].name.official
  }</b></p>
<p><b>Capital:</b> ${countries[0].capital}</p>
<p><b>Population:</b> ${countries[0].population}</p>
<p><b>Languages:</b> ${Object.values(countries[0].languages)}</p>
`;
  refs.countryInfo.innerHTML = markup;
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
