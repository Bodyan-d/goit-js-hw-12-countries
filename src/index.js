import './sass/main.scss';
import countriesTpl from './templates/list-countries.hbs'
import fetchCountries from './fetchCountries';
import { defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import { alert, notice, info, success, error } from '@pnotify/core';
import * as PNotifyFontAwesome4 from '@pnotify/font-awesome4';
defaultModules.set(PNotifyFontAwesome4, {});
const debounce = require('lodash.debounce');

const formRef = document.querySelector('.form');
const inputRef = document.querySelector('[data-input]');
const listRef = document.querySelector('.list-js');

inputRef.addEventListener('input', debounce(onInput, 500));

const myAlert = error({
    text: "I'm an error.",
    type: 'error',
    autoOpen: false,
    mode: 'dark',
});

function onInput(e) {

    const countries = fetchCountries(e.target.value);
    if (!countries) { return; };

    countries.then(r => {
        const countriesMarckp = countriesTpl(r);
        listRef.insertAdjacentHTML('beforeend', countriesMarckp)
        console.log();
    });

}

function moreTenCountries(items) {
    let errorIsOpen = false;

    if (items.length >= 10) {
        errorIsOpen = true;
        myAlert.open();
        console.log(errorIsOpen);

    } else if (!errorIsOpen) {
        myAlert.close();

    };

};