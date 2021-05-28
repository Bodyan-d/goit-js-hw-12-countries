export default function fetchCountries(searchQuery) {
    if (searchQuery) {
        return fetch(
                `https://restcountries.eu/rest/v2/name/${searchQuery}?fields=name;population;flag;languages;capital`,
            )
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Error fetching data');
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }
}