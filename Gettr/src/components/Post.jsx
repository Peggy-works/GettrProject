import { Favorite, FavoriteBorder, MoreVert, Delete, Message } from '@mui/icons-material'
import { Card, CardHeader, Avatar, IconButton, CardContent, Typography, CardActions, Checkbox, Tooltip } from '@mui/material'
import React from 'react'
import { authenticate, register } from '../api/AuthApi.js';
import axios from 'axios';

const Post = () => {
console.log("Hello from post.jsx");

authenticate("Peggy", "12345")
.then(response => {
    console.log(response.data.token);
    return response;
})
.catch(error => {
    console.log(error);
})

/*
axios.post('http://localhost:8080/api/auth/authenticate',
    {
        "username": "Peggy",
        "password": "12345"
    },
    {
        headers: {"Content-Type": "application/json"}
    }
)
.then(response => {
    console.log(response);
    return response;
})
.then(data => {
    console.log(data.token);
})
.catch(error => {
    console.log(error);
})
*/

  return (
    <Card sx={{ maxWidth: 5000 , margin: 5 }}>
      <CardHeader 
        avatar={
          <Avatar sx={{ bgcolor: "#002E5A" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert/>
          </IconButton>
        }
        title="Project Idea"
        subheader="April 25, 2023"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
        ut labore et dolore magna aliqua. Sit amet consectetur adipiscing elit. Elementum integer 
        enim neque volutpat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
        culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <IconButton aria-label="favorite-post">
          <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite sx={{ color: "#002E5A" }}/>} />
        </IconButton>

        <IconButton aria-label="view-comments">
          <Message/>
        </IconButton>
 
        <Tooltip title="Delete">
          <IconButton>
            <Delete/>
          </IconButton>
        </Tooltip>

      </CardActions>
    </Card>
  )
}

export default Post