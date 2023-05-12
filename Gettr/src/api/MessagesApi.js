import axios from 'axios';
const config = require('../config/config.js');


const instance = axios.create({
    baseUrl: config.dev.url.API_BASE_URL
})

function getUserMessages(){
    const config = {
        method: 'get',
        url: '/getUserMessages/'+localStorage.get('user').id,
        headers:{'Authorization': `Bearer ${localStorage.get('user').token}`}
    }
    json = JSON.parse(instance.get(config));
    if(json == null) {return new Map();}
    else{
        const tempMap = new Map();
        for(let i = 0; i < json.length; i++) {
            tempMap.set(json[i].messagesMapId.username_to,[]);
            for(let j = 0; j < json[i].messages.length; j++){
                tempMap.get(json[i].messagesMapId.username_to).push(json[i].messages[j]);
            }
        }
        return tempMap;
    }
}


export{getUserMessages}
