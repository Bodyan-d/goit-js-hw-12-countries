import './sass/main.scss';
import fetchCountries from './fetchCountries';
const debounce = require('lodash.debounce');

const formRef = document.querySelector('.form');
const inputRef = document.querySelector('[data-input]');
const listRef = document.querySelector('.list-js');

inputRef.addEventListener('input', debounce(onInput, 500));


function onInput(e) {
    const countries = fetchCountries(e.target.value);
    countries.then(console.log)
}