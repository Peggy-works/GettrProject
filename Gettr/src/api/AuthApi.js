import axios from 'axios';
const config = require('../config/config.js') 

const instance = axios.create({
    baseUrl: config.dev.url.API_BASE_URL
}) 

function authenticate(username, password) {
    return axios.post('http://localhost:8080/api/auth/authenticate',
    { "username": username, "hashedPassword": password },
    { headers: {"Content-Type": "application/json"}})
}

function register(username, password, name) {
    return instance.post('/auth/register',{
        params: {
            'username': username,
            'hashedPassword': password,
            'name': name
        },
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export { authenticate, register };

