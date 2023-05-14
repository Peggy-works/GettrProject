import React, { useEffect, useState } from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import './Messages.css'
import{getUserMessages} from '../api/MessagesApi.js';
import { getAllUserInfo } from '../api/UserApi.js';

var stompClient = null;

// let Sock = await new SockJS('http://localhost:8080/ws');
// stompClient = over(Sock);
// // stompClient.connect({},onConnected,onError) // the {} can contain headers if need be
// // registerUser();

// const initialPrivateMessages = (
//     getUserMessages()
// )

// const initialUsers = (
//     getAllUserInfo()
// )

// const Messages = () => {
   
//     /*const [userData,setUserData] is defining a state variable called userData using the useState hook. 
//     The state variable is initialized as an object with four properties: username, receivername, connected, 
//     and message.*/
//     /*setUserData is a function that can be used to update the userData state variable. When this function 
//     is called with a new value for userData, React will automatically update the component to reflect the 
//     new state.*/
//     const [userData,setUserData] = useState({
//         username:"",
//         receiverName:"",
//         connected:false,
//         message:""
//     })

//     const [userInfo,setUserInfo] = useState(
//         initialUsers    // once connected a user will get a map of ("username",id) for quick search results
//     )

//     const [publicChats, setPublicChats] = useState( // WILL NOT BE USED
//         []  // local memory of public chat array
//     )

//     const [privateChats,setPrivateChats] = useState(
//         initialPrivateMessages // map for key value pairs ("sender name",[]chats sent and recieved)
//     )

//     const [tab,setTab] = useState({
//         currTab:"CHATROOM", // curr tab will be set to the empty tab until user chooses a specific direct message
//         id:null     // the other user id that will be messaged
//     })

    
//     const [searchResults,setSearchResults] = useState(
//         []  // search results in list
//     )

//     const handleValue =(event)=>{
//         const {value,name} = event.target;
//         setUserData({...userData,[name]:value});
//     }

//     /*This code defines a function named registerUser that connects to a WebSocket endpoint using the SockJS 
//     library and the STOMP protocol.

//     The SockJS constructor creates a new SockJS object that represents a WebSocket endpoint. In this case, 
//     it connects to the endpoint located at http://localhost:8080/ws.

//     The stompClient variable is assigned a reference to a new STOMP client that is created by passing the 
//     SockJS object to the over function. This sets up the communication channel between the client and the server 
//     using the STOMP protocol.

//     The stompClient.connect function is then called with an empty object and two callback functions as arguments. 
//     The first callback function, onConnected, is called when the connection is successfully established with the 
//     server. The second callback function, onError, is called if there is an error during the connection process.

//     Overall, this code initializes a connection to a WebSocket endpoint using the SockJS library and the STOMP 
//     protocol, and sets up callback functions to handle the connection status.*/ 

//     const registerUser =async()=>{
//         let Sock = await new SockJS('http://localhost:8080/ws');
//         stompClient = await over(Sock);
//         stompClient.connect({},onConnected,onError); // the {} can contain headers if need be
//     }

//     const onConnected =()=>{
//         setUserData({...userData,"connected":true});
//         stompClient.subscribe('/chatroom/public',onPublicMessageRecieved);  // "subscribing"/listens to /public
//         stompClient.subscribe('/user/'+userData.username+'private',onPrivateMessageRecieved);
//         userJoin();
//     }

//     const userJoin =()=>{
//         let chatMessage={
//             senderName:JSON.parse(localStorage.getItem('user')).username,
//             senderId:JSON.parse(localStorage.getItem('user')).id,
//             status:'JOIN'
//         };
//         stompClient.send('/app/message',{},JSON.stringify(chatMessage));
//     }


//     const sendPrivateMessage=()=>{
//         if(stompClient){
//             let chatMessage={
//                 senderId:JSON.parse(localStorage.getItem('user')).id,
//                 receiverId:userInfo.get(tab.currTab),
//                 senderName:userData.username,
//                 receiverName:tab.currTab,
//                 message:userData.message,
//                 date:null,
//                 status:'MESSAGE'
//             };
//             if(userData.username !== tab.currTab){
//                 privateChats.get(tab.currTab).push(chatMessage)
//                 setPrivateChats(new Map(privateChats));
//             }
//             stompClient.send('/app/private-message',{},JSON.stringify(chatMessage));
//             setUserData({...userData,"message":""});
//         }
//     }

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

//     const sendPublicMessage=()=>{   // THIS FUNCTION WILL NOT BE USED FOR DM FEATURE
//         if(stompClient){
//             let chatMessage={
//                 senderName:userData.username,
//                 message:userData.message,
//                 status:'MESSAGE'
//             };
//             stompClient.send('/app/message',{},JSON.stringify(chatMessage));
//             setUserData({...userData,"message":""});
//         }
//     }


//     const onError =(err)=>{
//         console.log(err);
//     }

//     // let Sock = await new SockJS('http://localhost:8080/ws');
//     // stompClient = over(Sock);
//     stompClient.connect({},onConnected,onError) // the {} can contain headers if need be
//     registerUser();
    
//   return (
//     <div className="containter">
//         {localStorage.getItem('user')?
//             <div className='chat-box'>
//                 <div className='member-list'>
//                     <ul>
//                         <li onClick={()=>{setTab({...tab,"currTab":"CHATROOM"})}} className = {`member ${tab.currTab==="CHATROOM" && "active"}`}> ChatRoom</li>                         
                        
//                         {
//                         /*Below we are matching every arr value to the var 'name' as well as grabing the int index 
//                         of the current array value that we are on, for each arr value we then create an html list
//                         item to show the information of that person*/
                        
//                         [...privateChats.keys()].map((name,index)=>(
//                             <li onClick={()=>{setTab({...tab,"currTab":name,"id":userInfo.get(name)})}} className={`member ${tab.currTab===name && "active"}`} key={index}>
//                                 {name}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 {tab.currTab==="CHATROOM" && <div className='chat-content'>
//                     <ul className='chat-messages'>
//                     {
//                         /*same thing as above but we are now putting the actual public chat data into a html list item*/
//                         publicChats.map((chat,index)=>(
//                             <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
//                                 {chat.senderName !== userData.username && <div className='avatar'>{chat.senderName}</div>}
//                                 <div className='message-data'>{chat.message}</div>
//                                 {chat.senderName === userData.username && <div className='avatar self'>{chat.senderName}</div>}
//                             </li>
                        
//                     ))}
//                     </ul>
//                     <div className='send-message'>
//                         <input type='text' className='input-message' placeholder='enter public message' value={userData.message} name = 'message'
//                             onChange={handleValue}/>
//                         <button type='button' className='send-button' onClick={sendPublicMessage}>send</button>
//                     </div>
//                 </div>}
//                 {tab.currTab!=="CHATROOM" && <div className='chat-content'>
//                     <ul className='chat-messages'>
//                     {
                        
//                         /*same thing as above but we are now putting the actual public chat data into a html list item*/
//                         [...privateChats.get(tab.currTab)].map((chat,index)=>(
//                             <li className='message' key={index}>
//                                 {chat.senderName !== userData.username && <div className='avatar'>{chat.senderName}</div>}
//                                 <div className='message-data'>{chat.message}</div>
//                                 {chat.senderName === userData.username && <div className='avatar self'>{chat.senderName}</div>}
//                             </li>
                        
//                     ))}
//                     </ul>

//                     <div className='send-message'>
//                         <input type='text' className='input-message' placeholder={`enter private message for ${tab.currTab}`} value={userData.message}
//                             name = 'message' onChange={handleValue}/>
//                         <button type='button' className='send-button' onClick={sendPrivateMessage}>send</button>
//                     </div>
//                 </div>}
//             </div>
//             :
//             <div className="register">
//                 <input id="user-name"
//                 placeholder="Enter Name"
//                 value={userData.username}   // "value" and "username" both used in handleValue function
//                 name = 'username'
//                 onChange={handleValue}
//                 />
//                 <button type='button' onClick={registerUser}>
//                     connect
//                 </button>
//             </div>
//         }
//     </div>
//   )
// }
// export default Messages;
const Messages = () => {
    /*const [userData,setUserData] is defining a state variable called userData using the useState hook. 
    The state variable is initialized as an object with four properties: username, receivername, connected, 
    and message.*/
    /*setUserData is a function that can be used to update the userData state variable. When this function 
    is called with a new value for userData, React will automatically update the component to reflect the 
    new state.*/

    useEffect(()=>{
        console.log("in USE EFFECT");
        const registerUser =async()=>{
            if(stompClient !== null){
                await stompClient.disconnect();
                stompClient = null;
            }
            if(stompClient === null){
                let Sock = new SockJS('http://localhost:8080/ws');
                stompClient = over(Sock);
                await stompClient.connect({},onConnected,onError) // the {} can contain headers if need be
            }
        }
       registerUser();
    },[]);

    const [userData,setUserData] = useState({
        username:JSON.parse(localStorage.getItem('user')).username,
        userId:JSON.parse(localStorage.getItem('user')).id,
        receiverName:"",
        connected:false,
        message:""
    })

    const [publicChats, setPublicChats] = useState(
        []  // local memory of public chat array
    )

    const [privateChats,setPrivateChats] = useState(
        new Map() // map for key value pairs ("sender name",[]chats sent and recieved)
    )

    const [tab,setTab] = useState({
        currTab:"CHATROOM"
    })

    // will handle username and message value
    const handleValue =(event)=>{
        const {value,name} = event.target;
        setUserData({...userData,[name]:value});
    }


    // const registerUser =()=>{
    //     if(stompClient === null){
    //         let Sock = new SockJS('http://localhost:8080/ws');
    //         stompClient = over(Sock);
    //         stompClient.connect({},onConnected,onError) // the {} can contain headers if need be
    //     }
    // }
    /*This code defines a function named registerUser that connects to a WebSocket endpoint using the SockJS 
    library and the STOMP protocol.

    The SockJS constructor creates a new SockJS object that represents a WebSocket endpoint. In this case, 
    it connects to the endpoint located at http://localhost:8080/ws.

    The stompClient variable is assigned a reference to a new STOMP client that is created by passing the 
    SockJS object to the over function. This sets up the communication channel between the client and the server 
    using the STOMP protocol.

    The stompClient.connect function is then called with an empty object and two callback functions as arguments. 
    The first callback function, onConnected, is called when the connection is successfully established with the 
    server. The second callback function, onError, is called if there is an error during the connection process.

    Overall, this code initializes a connection to a WebSocket endpoint using the SockJS library and the STOMP 
    protocol, and sets up callback functions to handle the connection status.*/ 

    // const registerUser =()=>{
    //     if(stompClient === null){
    //         let Sock = new SockJS('http://localhost:8080/ws');
    //         stompClient = over(Sock);
    //         stompClient.connect({},onConnected,onError) // the {} can contain headers if need be
    //     }
    // }

    const onConnected =()=>{
        setUserData({...userData,"connected":true});
        stompClient.subscribe('/chatroom/public',onPublicMessageRecieved);  // "subscribing"/listens to /public
        stompClient.subscribe('/user/'+userData.username+'/private',onPrivateMessageRecieved);
        userJoin();
    }

    const userJoin =()=>{
        let chatMessage={
            senderName:userData.username,
            status:'JOIN'
        };
        stompClient.send('/app/message',{},JSON.stringify(chatMessage));
    }

    const onPublicMessageRecieved =(payload)=>{     // function for recieving payload json from server
        let payloadData=JSON.parse(payload.body);   // parsing json into payloadData
        switch(payloadData.status){ // .status being a key value in the json
            case "JOIN":    // case for JOIN status
                if(!privateChats.get(payloadData.senderName)){ // if new user joins chat room, and sends chat to public, then the user id will be added to all user listeners to /public local map
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE": // case for MESSAGE status (public)
                publicChats.push(payloadData);  // pushing entire json data into local memory 
                setPublicChats([...publicChats]);    // updating use state // may not work
                break;
            default:
                console.log("This should never happen")
        }
    }

    const onPrivateMessageRecieved =(payload)=>{    // passing payload into param
        let payloadData = JSON.parse(payload.body); // parsing into json
        // if user id (username) is already in the listeners map
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        // if not, then initialize key value pair in users private map
        }else{
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));;
        }
    }

    const sendPublicMessage=()=>{
        if(stompClient){
            let chatMessage={
                senderName:userData.username,
                message:userData.message,
                status:'MESSAGE'
            };
            stompClient.send('/app/message',{},JSON.stringify(chatMessage));
            setUserData({...userData,"message":""});
        }
    }

    const sendPrivateMessage=()=>{
        if(stompClient){
            let chatMessage={
                senderName:userData.username,
                receiverName:tab.currTab,
                message:userData.message,
                status:'MESSAGE'
            };
            if(userData.username !== tab.currTab){
                privateChats.get(tab.currTab).push(chatMessage)
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send('/app/private-message',{},JSON.stringify(chatMessage));
            setUserData({...userData,"message":""});
        }
    }

    const onError =(err)=>{
        console.log(err);
    }

  return (
    <div className="containter">
       
            <div className='chat-box'>
                <div className='member-list'>
                    <ul>
                        <li onClick={()=>{setTab({...tab,"currTab":"CHATROOM"})}} className = {`member ${tab.currTab==="CHATROOM" && "active"}`}> ChatRoom</li>
                        
                        
                        {
                        /*Below we are matching every arr value to the var 'name' as well as grabing the int index 
                        of the current array value that we are on, for each arr value we then create an html list
                        item to show the information of that person*/
                        
                        [...privateChats.keys()].map((name,index)=>(
                            <li onClick={()=>{setTab({...tab,"currTab":name})}} className={`member ${tab.currTab===name && "active"}`} key={index}>
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
                {tab.currTab==="CHATROOM" && <div className='chat-content'>
                    <ul className='chat-messages'>
                    {
                        /*same thing as above but we are now putting the actual public chat data into a html list item*/
                        publicChats.map((chat,index)=>(
                            <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                {chat.senderName !== userData.username && <div className='avatar'>{chat.senderName}</div>}
                                <div className='message-data'>{chat.message}</div>
                                {chat.senderName === userData.username && <div className='avatar self'>{chat.senderName}</div>}
                            </li>
                        
                    ))}
                    </ul>
                    <div className='send-message'>
                        <input type='text' className='input-message' placeholder='enter public message' value={userData.message} name = 'message'
                            onChange={handleValue}/>
                        <button type='button' className='send-button' onClick={sendPublicMessage}>send</button>
                    </div>
                </div>}
                {tab.currTab!=="CHATROOM" && <div className='chat-content'>
                    <ul className='chat-messages'>
                    {
                        /*same thing as above but we are now putting the actual public chat data into a html list item*/
                        [...privateChats.get(tab.currTab)].map((chat,index)=>(
                            <li className='message' key={index}>
                                {chat.senderName !== userData.username && <div className='avatar'>{chat.senderName}</div>}
                                <div className='message-data'>{chat.message}</div>
                                {chat.senderName === userData.username && <div className='avatar self'>{chat.senderName}</div>}
                            </li>
                    ))}
                    </ul>

                    <div className='send-message'>
                        <input type='text' className='input-message' placeholder={`enter private message for ${tab.currTab}`} value={userData.message}
                            name = 'message' onChange={handleValue}/>
                        <button type='button' className='send-button' onClick={sendPrivateMessage}>send</button>
                    </div>
                </div>}
            </div>
        
    </div>
  )
}
export default Messages;
