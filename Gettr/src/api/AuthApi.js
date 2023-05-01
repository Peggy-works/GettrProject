const axios = require('axios').default
const config = require('../config/config.js') 

const instance = axios.create({
    baseUrl: config.url.API_BASE_URL
}) 

function authenticate(username, password) {
    return instance.post('/auth/authenticate', {
        params: {
            'username': username,
            'password': password
        },
        headers: {
            'Content-type': 'application/json'
        }
    })
} 

function register(username, password, name) {
    return instance.post('/auth/register',{
        params: {
            'username': username,
            'password': password,
            'name': name
        },
        headers: {
            'Content-type': 'application/json'
        }
    })
}

