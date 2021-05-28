import './sass/main.scss';

import countriesTpl from './templates/list-countries.hbs'
import singleCountrieTpl from './templates/single-countrie.hbs'
import fetchCountries from './fetchCountries';

import { error, alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const myError = error({
    text: 'Too many matches found. Please enter a more specific querty!',
    autoOpen: false,
    delay: 4000,

});

const myAlert = alert({
    text: "I'm an alert.",
    type: 'info',
    autoOpen: false,
});


const debounce = require('lodash.debounce');

const formRef = document.querySelector('.form');
const inputRef = document.querySelector('[data-input]');
const listRef = document.querySelector('.list-js');

inputRef.addEventListener('input', debounce(onInput, 500));

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

    if (items.length >= 10 && !errorIsOpen) {
        errorIsOpen = true;
        myError.open();
        return;
    };

    if (errorIsOpen) {
        errorIsOpen = false;
        myError.close();

    };

};