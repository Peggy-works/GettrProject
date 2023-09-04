import React, { useEffect, useState} from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import './Messages.css'
import { createTheme, ThemeProvider} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import SendIcon from '@mui/icons-material/Send';
import{fetchUserMessages,sendMessage} from '../api/MessagesApi.js';
import { fetchUserInfo } from '../api/UserApi.js';
import ResponsiveAppBar from './Nav'
import { borderRadius, padding } from '@mui/system';

var stompClient = null;
const theme = createTheme({
  table: {
    inWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '82vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '80vh',
    overflowY: 'auto'
  },
  chatSelf:{
    backgroundColor: '#c5c8e0',
    padding:'10px',
    borderRadius:'5px',
    //display: 'inline-flex',
    align:'left',
    maxWidth: '400px',
    whiteSpace: 'wrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
    chatOut:{
        backgroundColor: '#9bd996',
        padding:'10px',
        borderRadius:'5px',
        //display: 'inline-flex',  
        align:'right',
        maxWidth: '400px',
        whiteSpace: 'wrap',
        overflow: 'hidden',
    textOverflow: 'ellipsis'
    },
    divWidth:{
        width:'100%'
    },
    mouse:{
        cursor:'pointer'
    },

  selected:{
    cursor:'pointer',
    backgroundColor: "#C5C8E0",
    borderRadius: '5px',
    padding:'1%',
    width: '100%'
  },
  notSelected:{
    cursor:'pointer',
    borderRadius: '5px',
    padding:'1%',
    width: '100%'
  },
  
});


const Messages = () => {
    /*const [userData,setUserData] is defining a state variable called userData using the useState hook. 
    The state variable is initialized as an object with four properties: username, receivername, connected, 
    and message.*/
    /*setUserData is a function that can be used to update the userData state variable. When this function 
    is called with a new value for userData, React will automatically update the component to reflect the 
    new state.*/
    //const classes = useStyles();

    useEffect(()=>{ // will run once, as soon as component mounts
        const fetchData = async()=>{
            const usermessages = await fetchUserMessages(); // fetches all existing messages that a user has
            if(usermessages != undefined){
                for(let [key,value] of usermessages){
                    if(key != userData.username && !privateChats.has(key)){
                        privateChats.set(key,value);
                    }
                }
            }
            const userinfo = await fetchUserInfo(); // gets all existing user info (user id, username)
            for(let [key,value] of userinfo){
                if(key != userData.username && !userInfo.has(key)){
                    userInfo.set(key,value);
                }
            }
            setUserInfo(new Map(userInfo));         // sets use state for user info
            setPrivateChats(new Map(privateChats)); // sets sets use state for all private chats
        }

        // function to register user with the stomp websocket
        const registerUser =async()=>{
            if(stompClient !== null){   // assuring that a user was not previously connected
                await stompClient.disconnect();
                stompClient = null;
            }
            if(stompClient === null){
                let Sock = new SockJS('http://localhost:8080/ws');
                stompClient = over(Sock);
                await stompClient.connect({},onConnected,onError) // the {} can contain headers if need be
            }
        }
        fetchData();
        registerUser();

        return async()=> {  // clean up
            await stompClient.disconnect();
        }
    },[]);

    // use state for current user data
    const [userData,setUserData] = useState({
        username:JSON.parse(localStorage.getItem('user')).username,
        userId:JSON.parse(localStorage.getItem('user')).id,
        receiverName:"",
        searchTerm:"",
        connected:false,
        message:""
    });

    // use state for private chats
    const [privateChats,setPrivateChats] = useState(
        // map for key value pairs ("sender name",[]chats sent and recieved)
        new Map()
    );

    // use state to hold info for all users
    const [userInfo,setUserInfo] = useState(
        // map for key value pairs (user id, username)
        new Map()
    );

    // use state to track what 'tab' is clicked on
    const [tab,setTab] = useState({
        currTab:"", // will hold user name
        id:null             // will hold userId
    });

    // use state for username search
    const [searchQuery,setSearchQuery] = useState(
        []
    );

    // will handle username and message value
    const handleValue =(event)=>{
        const {value,name} = event.target;
        setUserData({...userData,[name]:value});
    }

    // function to handle search return values
    const handleSearch =(event)=>{
        setSearchQuery(searchQuery=>[]);
        let usernames = Array.from(userInfo.keys());
        const {value} = event.target;
        console.log(value);
        setSearchQuery(searchQuery=>usernames.filter(item=>item.toLowerCase().indexOf(value) > -1));
        setUserData({...userData,"searchTerm":value});
    }


   
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


    const onConnected =()=>{
        setUserData({...userData,"connected":true});
        stompClient.subscribe('/chatroom/public',onPublicMessageRecieved);  // "subscribing"/listens to /public
        stompClient.subscribe('/user/'+userData.username+'/private',onPrivateMessageRecieved);
        userJoin();
    }

    // joining websocket message
    const userJoin =()=>{
        let chatMessage={
            senderName:userData.username,
            senderId:userData.userId,
            status:'JOIN'
        };
        stompClient.send('/app/message',{},JSON.stringify(chatMessage));
    }


    const onPublicMessageRecieved =(payload)=>{     // function for recieving payload json from server
        let payloadData=JSON.parse(payload.body);   // parsing json into payloadData
        switch(payloadData.status){ // .status being a key value in the json
            case "JOIN":    // case for JOIN status
                if(!privateChats.get(payloadData.senderName) && payloadData.senderName != userData.username){ // if new user joins chat room, and sends chat to public, then the user id will be added to all user listeners to /public local map
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                if(!userInfo.get(payloadData.senderName) && payloadData.senderName != userData.username){  // updating user info
                    userInfo.set(payloadData.senderName,payloadData.senderId);
                    setUserInfo(new Map(userInfo));
                }
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
            setPrivateChats(new Map(privateChats));
        }
    }

    // const sendPublicMessage=()=>{
    //     if(stompClient){
    //         let chatMessage={
    //             senderName:userData.username,
    //             message:userData.message,
    //             status:'MESSAGE'
    //         };
    //         stompClient.send('/app/message',{},JSON.stringify(chatMessage));
    //         setUserData({...userData,"message":""});
    //     }
    // }

    const sendPrivateMessage=()=>{
        if(stompClient){
            let chatMessage={
                senderName:userData.username,
                senderId:userData.userId,
                receiverName:tab.currTab,
                receiverId:tab.id,
                message:userData.message,
                date:null,
                status:'MESSAGE'
            };
            if(userData.username !== tab.currTab){
                if(!privateChats.has(tab.currTab)){
                    privateChats.set(tab.currTab,[]);
                }
                privateChats.get(tab.currTab).push(chatMessage);
            }
            stompClient.send('/app/private-message',{},JSON.stringify(chatMessage));
            sendMessage(chatMessage);
            setUserData({...userData,"message":""});
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError =(err)=>{
        console.log(err);
    }

  return (
    
<div>
<ResponsiveAppBar/>
  <ThemeProvider theme={theme}>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">Messages</Typography>
            </Grid>
        </Grid>
        <Grid container component={Paper} style={theme.chatSection}>
            <Grid item xs={3} style={theme.borderRight500}>
                <List>
                    <ListItem key="User">
                        <ListItemIcon style = {theme.mouse} onClick={()=>{setTab({...tab,"currTab":"","id":null})}}>
                        <Avatar alt={userData.username} />
                        </ListItemIcon>
                        <ListItemText primary={userData.username}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
                <Grid item xs={12} style={{padding: '10px'}}>
                    <TextField id="outlined-basic-email" label="Search for a user" variant="outlined" fullWidth value = {userData.searchTerm} onChange={handleSearch}/>
                </Grid>
                <Divider />
                {privateChats.size > 0 && userData.searchTerm === "" &&
                    <List>
                        {  
                        [...privateChats.keys()].map((name,index)=>(
                            <ListItem key = {index} >
                                { tab.currTab === name &&
                                <ListItemIcon style={theme.selected} onClick={()=>{setTab({...tab,"currTab":name,"id":userInfo.get(name)});}}>
                                    <Avatar alt={name} />
                                    <ListItemText primary={name}>{name}</ListItemText>
                                </ListItemIcon>
                                }
                                { tab.currTab !== name &&
                                <ListItemIcon style={theme.notSelected} onClick={()=>{setTab({...tab,"currTab":name,"id":userInfo.get(name)});}}>
                                    <Avatar alt={name} />
                                    <ListItemText primary={name}>{name}</ListItemText>
                                </ListItemIcon>
                                }
                            </ListItem>
                        ))}
                    </List>
                }
                { userData.searchTerm !== "" &&
                    <List>
                        {
                        [...searchQuery].map((name,index)=>(
                            <ListItem key = {index}>
                                { tab.currTab === name &&
                                <ListItemIcon style={theme.selected} onClick={()=>{setTab({...tab,"currTab":name,"id":userInfo.get(name)});}}>
                                    <Avatar alt={name} />
                                    <ListItemText primary={name}>{name}</ListItemText>
                                </ListItemIcon>
                                }
                                { tab.currTab !== name &&
                                <ListItemIcon style={theme.notSelected} onClick={()=>{setTab({...tab,"currTab":name,"id":userInfo.get(name)});}}>
                                    <Avatar alt={name} />
                                    <ListItemText primary={name}>{name}</ListItemText>
                                </ListItemIcon>
                                }
                            </ListItem>
                        ))}
                    </List>
                }
            </Grid>
            <Grid item xs={9}>
            { tab.currTab != "" &&
                <List style={theme.messageArea} >
                    {privateChats.has(tab.currTab) &&
                        [...privateChats.get(tab.currTab)].map((chat,index)=>(
                            <ListItem key={index} >
                                <Grid container>
                                    <Grid item xs={12} >
                                        <Grid container columns={2}>
                                            { chat.senderName === userData.username &&
                                            <Grid item xs = 'auto' justifyContent='left' alignItems='flex-start'>
                                                {chat.senderName === userData.username && <ListItemText primary={chat.message}  style= {theme.chatSelf} align="left" ></ListItemText>}
                                            </Grid>
                                            }

                                            {chat.senderName !== userData.username && <Grid item xs></Grid>}

                                            { chat.senderName !== userData.username &&
                                            <Grid item xs = 'auto' justifyContent='right' alignItems='flex-end'>
                                                {chat.senderName !== userData.username && <ListItemText primary={chat.message} style={theme.chatOut} align="right"></ListItemText>}
                                            </Grid>
                                            }  
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))
                    }
                </List>
            }
                <Divider />
                { tab.currTab !== "" &&
                <Grid container style={{padding: '10px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth name = 'message' value={userData.message} onChange={handleValue}/>
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab color="primary" aria-label="add" ><SendIcon onClick={sendPrivateMessage}/></Fab>
                    </Grid>
                </Grid>
                }
            </Grid>
        </Grid>
        </ThemeProvider>
      </div>
  );
}
export default Messages;
