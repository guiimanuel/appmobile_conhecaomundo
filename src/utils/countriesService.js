import axios from 'axios';

const countriesService = axios.create({
    baseURL: 'https://restcountries.com/v3.1/'
});

export default countriesService;