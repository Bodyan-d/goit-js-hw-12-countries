import './sass/main.scss';
import countriesTpl from './templates/list-countries.hbs'
import singleCountrieTpl from './templates/single-countrie.hbs'
import fetchCountries from './fetchCountries';
import { defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
const { alert, notice, info, success, error } = require('@pnotify/core');
import * as PNotifyFontAwesome4 from '@pnotify/font-awesome4';
defaultModules.set(PNotifyFontAwesome4, {});
const debounce = require('lodash.debounce');

const formRef = document.querySelector('.form');
const inputRef = document.querySelector('[data-input]');
const listRef = document.querySelector('.list-js');

inputRef.addEventListener('input', debounce(onInput, 500));


// Manually set the type.
const myAlert = alert({
    text: "I'm an alert.",
    type: 'info',
    autoOpen: false,
});

// Automatically set the type.
const myNotice = notice({
    text: "I'm a notice.",
    autoOpen: false,
});

const myInfo = info({
    text: "I'm an info message.",
    autoOpen: false,
});

const mySuccess = success({
    text: "I'm a success message.",
    autoOpen: false,
});

const myError = error({
    text: "I'm an error message.",
    autoOpen: false,
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

    if (items.length >= 10 || !errorIsOpen) {
        errorIsOpen = true;
        myError.open();
        return;
    };

    if (errorIsOpen) {
        errorIsOpen = false;
        myError.close();

    };

};