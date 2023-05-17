import { Box } from "@mui/material";

import Dashboard from "./components/Dashboard";
import ResponsiveAppBar from "./components/Nav";
import Messages from "./components/Messages";
import Signup from "./components/Signup";
import About from "./components/About";

import { Routes, Route } from "react-router-dom"
import PostComments from "./components/PostComments";
import UserState from "./components/UserState";
import { UserContext } from "./components/UserState";

import './App.css';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import { useState } from "react";

function App() {
  const [user,setUser] = useState({
    username: "",
    id:null,
    token:""
  });
  return (
    
    <Box>
      <ResponsiveAppBar/>
      <UserContext.Provider value={{user,setUser}}>
      <Routes>
        
          <Route path="/" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Messages" element={<Messages/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/Logout" element={<Signup/>}/>
          <Route path="/Dashboard/PostComments" element={<PostComments/>}/>
        
      </Routes>
      </UserContext.Provider>
    </Box>
    
  )
}

export default App;