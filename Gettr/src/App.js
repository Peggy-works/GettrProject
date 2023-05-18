import { Box } from "@mui/material";

import Dashboard from "./components/Dashboard";
import Messages from "./components/Messages";
import Signup from "./components/Signup";
import About from "./components/About";

import { Routes, Route } from "react-router-dom"
import PostComments from "./components/PostComments";

import './App.css';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

//import SignupPage from './components/Signup';
//import LoginPage from './components/Login';


function App() {

  return (
    
    <Box>
      <Routes>
        
          <Route path="/" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/Messages" element={<Messages/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/Logout" element={<Signup/>}/>
          <Route path="/Dashboard/PostComments" element={<PostComments/>}/>
        
      </Routes>
    </Box>
    
  )
}

export default App;