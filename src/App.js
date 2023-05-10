import { Box } from "@mui/material";

import Dashboard from "./components/Dashboard";
import ResponsiveAppBar from "./components/Nav";
import Messages from "./components/Messages";
import Signup from "./components/Signup";
import About from "./components/About";

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Box>
      <ResponsiveAppBar/>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Messages" element={<Messages/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Logout" element={<Signup/>}/>
      </Routes>
    </Box>
  );
}

export default App;
