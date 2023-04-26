import { Box, Stack } from "@mui/material";

import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import Add from "./components/Add";


function App() {

  return (
    <Box>
      <Navbar/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar/>
        <Feed/>
      </Stack>
      <Add/>
    </Box>
  );
}

export default App;
