import axios from 'axios';
const config = require('../config/config.js');

const instance = axios.create({
    baseUrl: config.dev.url.API_BASE_URL
})

// function getAllUserInfo(){
//     axios.get('http://localhost:8080/user/getUserInfo')
//     .then((response)=>{
//         if(response.data.length>0 && response.data){
//             let temp = new Map();
//             if(response.data != null){
//                 for(let i = 0; i < response.data.length; i++) {
//                     console.log(response.data[i].username);
//                     console.log(response.data[i].id);
//                     temp.set(response.data[i].username,response.data[i].id);
//                     //console.log(i);
//                 }
//             }
//             console.log(temp.size);
//             return new Map(temp);
//         }
//     }).catch((error)=>{
//         console.log(error);
//     });
 
//     return new Map();
// }
function getAllUserInfo() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8080/user/getUserInfo')
        .then((response) => {
          if (response.data.length > 0 && response.data) {
            let temp = new Map();
            if (response.data != null) {
              for (let i = 0; i < response.data.length; i++) {
                temp.set(response.data[i].username, response.data[i].id);
              }
            }
            resolve(temp);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  async function fetchUserInfo() {
    try {
      const userInfo = await getAllUserInfo();
      return userInfo;
    } catch (error) {
      console.log(error);
    }
  }

export{fetchUserInfo}