import './sass/main.scss';

import countriesTpl from './templates/list-countries.hbs'
import singleCountrieTpl from './templates/single-countrie.hbs'
import fetchCountries from './fetchCountries';

import Toastify from 'toastify-js';

const debounce = require('lodash.debounce');

const inputRef = document.querySelector('[data-input]');
const listRef = document.querySelector('.list-js');

inputRef.addEventListener('input', debounce(onInput, 500));

function onInput(e) {

    const countries = e.target.value;
    if (!countries) {
        return;
    }

    fetchCountries(countries).then(r => {
        listRef.innerHTML = "";
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

    const countriesMarckps = countriesTpl(r);
    return listRef.insertAdjacentHTML('beforeend', countriesMarckps);
};

function addSingleMurkup(r) {

    const countriesMarckp = singleCountrieTpl(r);
    return listRef.insertAdjacentHTML('beforeend', countriesMarckp);
}


function moreTenCountries(items) {
    if (items.length >= 10) {
        Toastify({
            text: "Too many matches found. Please enter a more specific querty!",
            destination: "https://github.com/apvarun/toastify-js",
            close: true,
            backgroundColor: "linear-gradient(to right, #f13d3d, #7d0b0b)",
        }).showToast();
        return;
    };
};