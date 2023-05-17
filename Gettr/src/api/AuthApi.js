import axios from 'axios';

function authenticate(username, password) {
    return axios.post('http://localhost:8080/api/auth/authenticate',
    { "username": username, "hashedPassword": password },
    { headers: {"Content-Type": "application/json"}})
}

function register(username, password, name) {
    return axios.post('http://localhost:8080/api/auth/register',
    {
        "username": username,
        'hashedPassword': password,
        'name': name
    },
    {
        headers: {
            "Content-type": "application/json"
        }
    })
}

export { authenticate, register };

