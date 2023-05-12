const axios = require('axios').default
const config = require('../config/config.js') 

const instance = axios.create({
    baseUrl: config.url.API_BASE_URL
}) 


