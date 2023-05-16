import axios from 'axios';
const config = require('../config/config.js');
// import { messagesContext } from '../components/MessagesContext.js';
// import React, {useContext} from 'react';

//var stompClient = null;

const instance = axios.create({
    baseUrl: config.dev.url.API_BASE_URL
})

function getUserMessages(){
    return new Promise((resolve,reject) => {
        axios.get('http://localhost:8080/user/getUserMessages/'+(JSON.parse(localStorage.getItem('user')).id))
        .then((response)=>{
            if(response.data.length>0 && response.data){
                let tempMap = new Map();
                for(let i = 0; i < response.data.length; i++) {
                    tempMap.set(response.data[i].messagesMapId.username_to,[]);
                    for(let j = 0; j < response.data[i].messages.length; j++){
                        tempMap.get(response.data[i].messagesMapId.username_to).push(response.data[i].messages[j]);
                    }
                }
                resolve(tempMap);
            }
        })
        .catch((error)=>{
            console.log(error);
            reject(error);
        });
    });
}

async function fetchUserMessages() {
    try {
      const userMessages = await getUserMessages();
      return userMessages;
    } catch (error) {
      console.log(error);
    }
  }



export{fetchUserMessages}
