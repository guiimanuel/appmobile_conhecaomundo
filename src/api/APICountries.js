import axios from 'axios';

const APICountries = axios.create({
    baseURL: 'https://restcountries.com/v3.1/'
});

export default APICountries;