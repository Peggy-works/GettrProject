import axios from 'axios';
const config = require('../config/config.js');

const instance = axios.create({
    baseUrl: config.dev.url.API_BASE_URL
})

function getAllUserInfo(){
    axios.get('http://localhost:8080/user/getUserInfo')
    .then((response)=>{
        if(response.data.length>0 && response.data){
            const temp = new Map();
            if(response.data != null){
                for(let i = 0; i < response.data.length; i++) {
                    temp.set(response.data[i].username,response.data[i].id);
                }
            }
            return temp;
        }
    }).catch((error)=>{
        console.log(error);
    });
 
    return new Map();
}

export{getAllUserInfo}