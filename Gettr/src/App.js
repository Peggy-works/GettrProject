import { Box } from "@mui/material";

import Add from "./components/Add";
import Dashboard from "./components/Dashboard";
import ResponsiveAppBar from "./components/Nav";
import Users from "./components/Users";
import Messages from "./components/Messages";
import Signup from "./components/Signup";

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Box>
      <ResponsiveAppBar/>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Users" element={<Users/>}/>
        <Route path="/Messages" element={<Messages/>}/>
        <Route path="/Logout" element={<Signup/>}/>
      </Routes>
      <Add/>
    </Box>
  );
}

export default App;
