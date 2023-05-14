// import React, { useState } from 'react';
// import {over} from 'stompjs';
// import SockJS from 'sockjs-client';
// import{getUserMessages} from '../api/MessagesApi.js';
// import { getAllUserInfo } from '../api/UserApi.js';
// var stompClient = null;

// const privateChats = (
//     getUserMessages()
// )

// const userInfo = (
//     getAllUserInfo()
// )

// const onPublicMessageRecieved =(payload)=>{     // function for recieving payload json from server
//     let payloadData=JSON.parse(payload.body);   // parsing json into payloadData
//     switch(payloadData.status){ // .status being a key value in the json
//         case "JOIN":    // case for JOIN status
//             if(!privateChats.get(payloadData.senderName)){ // if new user joins chat room, and sends chat to public, then the user id will be added to all user listeners to /public local map
//                 privateChats.set(payloadData.senderName,[]);
//             }
//             if(!userInfo.get(payloadData.senderName)){
//                 userInfo.set(payloadData.senderName,payloadData.senderId);
//             }
//             break;
//         // case "MESSAGE": // case for MESSAGE status (public) // WILL NOT BE USED FOR DM FEATURE
//         //     publicChats.push(payloadData);  // pushing entire json data into local memory 
//         //     setPublicChats([...publicChats]);    // updating use state // may not work
//         //     break;
//         default:
//             console.log("This should never happen")
//     }
// }

// function registerUser(){
//     let Sock = new SockJS('http://localhost:8080/ws');
//     stompClient = over(Sock);
//     stompClient.connect({}, function onConnected(){
//         setUserData({...userData,"connected":true});
//         stompClient.subscribe('/chatroom/public',onPublicMessageRecieved);  // "subscribing"/listens to /public
//         stompClient.subscribe('/user/'+userData.username+'/private',onPrivateMessageRecieved);
//         let chatMessage={
//             senderName:userData.username,
//             status:'JOIN'
//         };
//         stompClient.send('/app/message',{},JSON.stringify(chatMessage));
//     }, function onError(){
//         console.log(err);
//     }) // the {} can contain headers if need be
// }

// export const messagesContext = React.createContext();
// export const usersContext = React.createContext();

// const messagesState = ({children}) =>{
//     const [privateMessages,setPrivateMessages] = useState(initialPrivateMessages);
//     const [userInfo,setUserInfo] = useState(initialUsers);

//     // const registerUser =()=>{
//     //     let Sock = new SockJS('http://localhost:8080/ws');
//     //     stompClient = over(Sock);
//     //     stompClient.connect({},onConnected,onError) // the {} can contain headers if need be
//     // }


//     const onPublicMessageRecieved =(payload)=>{     // function for recieving payload json from server
//         let payloadData=JSON.parse(payload.body);   // parsing json into payloadData
//         switch(payloadData.status){ // .status being a key value in the json
//             case "JOIN":    // case for JOIN status
//                 if(!privateChats.get(payloadData.senderName)){ // if new user joins chat room, and sends chat to public, then the user id will be added to all user listeners to /public local map
//                     privateChats.set(payloadData.senderName,[]);
//                     setPrivateChats(new Map(privateChats));
//                 }
//                 if(!userInfo.get(payloadData.senderName)){
//                     userInfo.set(payloadData.senderName,payloadData.senderId);
//                     setUserInfo(new Map(userInfo));
//                 }
//                 break;
//             case "MESSAGE": // case for MESSAGE status (public) // WILL NOT BE USED FOR DM FEATURE
//                 publicChats.push(payloadData);  // pushing entire json data into local memory 
//                 setPublicChats([...publicChats]);    // updating use state // may not work
//                 break;
//             default:
//                 console.log("This should never happen")
//         }
//     }

//     const onPrivateMessageRecieved =(payload)=>{    // passing payload into param
//         let payloadData = JSON.parse(payload.body); // parsing into json
//         // if user id (username) is already in the listeners map
//         if(privateChats.get(payloadData.senderName)){
//             privateChats.get(payloadData.senderName).push(payloadData); // pushing the entire message object
//             setPrivateChats(new Map(privateChats));
//         // if not, then initialize key value pair in users private map
//         }else{
//             let list = [];
//             list.push(payloadData);
//             privateChats.set(payloadData.senderName,list);
//             setPrivateChats(new Map(privateChats));
//         }
//     }

//     // const sendPublicMessage=()=>{   // THIS FUNCTION WILL NOT BE USED FOR DM FEATURE
//     //     if(stompClient){
//     //         let chatMessage={
//     //             senderName:userData.username,
//     //             message:userData.message,
//     //             status:'MESSAGE'
//     //         };
//     //         stompClient.send('/app/message',{},JSON.stringify(chatMessage));
//     //         setUserData({...userData,"message":""});
//     //     }
//     // }

//     return(
//         <messagesContext.Provider value={[privateMessages,setPrivateMessages]}>
//             <usersContext.Provider value={[userInfo,setUserInfo]}>
//                 {children}
//             </usersContext.Provider>
//         </messagesContext.Provider>
//     )
// }

// export function usePrivateMessages(){

// }

// export default messagesState;

