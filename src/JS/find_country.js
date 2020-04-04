import PNotify from 'pnotify/dist/es/PNotify';
import debounce from 'lodash.debounce/index.js';
// let debounce = require('lodash.debounce');
import marckup from '../hbs/list.hbs';
import marckupOneCountry from '../hbs/one.hbs';


const input = document.querySelector('#test');
const output = document.querySelector('.output');
const baseUrl = 'https://restcountries.eu/rest/v2/name/';

PNotify.defaults.delay = 1000;

input.addEventListener('input', debounce(fetchCountry, 500))

function fetchCountry() {

    if (!input.value) return;

    fetch(baseUrl + input.value)
        .then(response => response.json())
        .then(data => {
            const [country] = data;
            console.log(data);
            if (data.length > 10) {
                PNotify.error({
                    text: 'Too many matches'
                });
            };

            if (data.length > 1 && data.length < 11) {
                output.innerHTML = '';
                output.insertAdjacentHTML('beforeend', marckup(data));

                output.addEventListener('click', (e) => {
                    input.value = e.target.innerText;
                    console.log(input.value);
                    fetchCountry();

                })

            }

            if (data.length === 1) {
                output.innerHTML = '';
                output.insertAdjacentHTML('beforeend', marckupOneCountry(country))
            }

            console.log(data.length);
        })
        .catch(error => console.error(error));
}