import axios from 'axios';
const config = require('../config/config.js');

const instance = axios.create({
    baseUrl: config.dev.url.API_BASE_URL
})

function getAllUserInfo(){
    const config = {
        method: 'get',
        url: '/getUserInfo',
        headers:{'Authorization': `Bearer ${localStorage.get('user').token}`}
    }
    json = JSON.parse(instance.get(config));
    const temp = new Map();
    for(let i = 0; i < json.length; i++) {
        temp.set(json[i].username,json[i].id);
    }
    return temp;
}

export{getAllUserInfo}