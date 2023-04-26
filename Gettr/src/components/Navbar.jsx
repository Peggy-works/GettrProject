import { EmojiObjectsTwoTone } from '@mui/icons-material';
import { AppBar, styled, Box, Toolbar, Typography, Avatar, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'

/* Custom Toolbar */
const StyledToolbar = styled(Toolbar) ({
  display:"flex",
  justifyContent:"space-between"
})

const UserBox = styled(Box) (({theme})=> ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}))

const Navbar = () => {

  /* (Hook) Opens and Closes Menu */
  const [open, setOpen] = useState(false)

  return (
    <AppBar position="sticky">
      <StyledToolbar>

        <Box display="flex">
          <EmojiObjectsTwoTone sx={{ mr: 1 }}/>
          <Typography variant='h6' noWrap sx={{display:{xs:"block", sm:"block", fontFamily: 'monospace', fontWeight: 500, letterSpacing: '.2rem'}}} >GETTR</Typography>
        </Box>
        
        <UserBox onClick = {(e) => setOpen(true)}>
          <Avatar src="/broken-image.jpg" 
              />
          <Typography variant='span'>Deez</Typography>
        </UserBox>

      </StyledToolbar>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose= {(e) => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>Dashboard</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Messages</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>

    </AppBar>
  )
}

export default Navbar