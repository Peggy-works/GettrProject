import axios from 'axios';
const config = require('../config/config.js');

const instance = axios.create({
    baseUrl: config.dev.url.API_BASE_URL
})

function getAllUserInfo(){
    let json = null;
    axios.get('http://localhost:8080/user/getUserInfo')
    .then((response)=>{
        if(response.data.length>0){
            json = JSON.parse(response.data);
        }
    });
    const temp = new Map();
    if(json != null){
        for(let i = 0; i < json.length; i++) {
            temp.set(json[i].username,json[i].id);
        }
    }
    return temp;
}

export{getAllUserInfo}