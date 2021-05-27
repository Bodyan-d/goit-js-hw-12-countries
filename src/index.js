import './sass/main.scss';
import fetchCountries from './fetchCountries';
import { defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import { alert, notice, info, success, error } from '@pnotify/core';
import * as PNotifyFontAwesome4 from '@pnotify/font-awesome4';

defaultModules.set(PNotifyFontAwesome4, {});

const myAlert = error({
    text: "I'm an error.",
    type: 'error',
    autoOpen: false,
    mode: 'dark',
});

const debounce = require('lodash.debounce');

const formRef = document.querySelector('.form');
const inputRef = document.querySelector('[data-input]');
const listRef = document.querySelector('.list-js');

inputRef.addEventListener('input', debounce(onInput, 500));


function onInput(e) {
    const countries = fetchCountries(e.target.value);
    countries.then(console.log)
}