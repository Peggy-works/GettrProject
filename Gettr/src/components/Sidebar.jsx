import { Chat, Home, Logout, Person, RecentActors } from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const Sidebar = () => {
  return (
    
    <Box
        /* flex 1 for sidebar, 6 for feed */
        flex={1} 
        padding={1}
        //bgcolor="#d1d3d4"
        
        /* default points -> makes responsive by removing display on smaller screens
        and only showing the feed */
        sx={{display:{xs: "none", sm: "block"} }}
      >
        <Box position="fixed">
          <List>
            <ListItem disablePadding>
            <ListItemButton component="a" href="#dashboard">
              <ListItemIcon>
                <Home/>
              </ListItemIcon>
              <ListItemText primary="Dashboard"/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#profile">
              <ListItemIcon>
                <Person/>
              </ListItemIcon>
              <ListItemText primary="Profile"/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#messages">
              <ListItemIcon>
                <Chat/>
              </ListItemIcon>
              <ListItemText primary="Messages"/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#users">
              <ListItemIcon>
                <RecentActors/>
              </ListItemIcon>
              <ListItemText primary="Users"/>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" href="#logout">
              <ListItemIcon>
                <Logout/>
              </ListItemIcon>
              <ListItemText primary="Logout"/>
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
    </Box>
  )  
}

export default Sidebar