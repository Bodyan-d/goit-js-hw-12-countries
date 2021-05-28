import './sass/main.scss';
import countriesTpl from './templates/list-countries.hbs'
import singleCountrieTpl from './templates/single-countrie.hbs'
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

    const countries = e.target.value;
    if (!countries) {
        return;
    }

    fetchCountries(countries).then(r => {
        if (r.length >= 10) {
            moreTenCountries(r)
            return;
        };

        if (r.length > 1) {
            addMultiMurkup(r);
        } else {
            addSingleMurkup(r);
        };

    });
}

function addMultiMurkup(r) {
    listRef.innerHTML = "";
    const countriesMarckps = countriesTpl(r);
    return listRef.insertAdjacentHTML('beforeend', countriesMarckps);
};

function addSingleMurkup(r) {
    listRef.innerHTML = "";
    const countriesMarckp = singleCountrieTpl(r);
    return listRef.insertAdjacentHTML('beforeend', countriesMarckp);
}


function moreTenCountries(items) {
    let errorIsOpen = false;

    if (items.length >= 10) {
        errorIsOpen = true;
        myAlert.open();
        return;
    };

    if (errorIsOpen) {
        errorIsOpen = false;
        myAlert.close();

    };

};