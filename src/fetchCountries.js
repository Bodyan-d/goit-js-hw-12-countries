export default function fetchCountries(searchQuery) {
    if (searchQuery === "") { return; };
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

    return fetch(url).then(resolve => resolve.json()).then(resolve => resolve);


}