import { Favorite, FavoriteBorder, Delete, Message } from '@mui/icons-material'
import { Card, CardHeader, IconButton, CardContent, Typography, CardActions, Checkbox, Tooltip } from '@mui/material'
import React from 'react'
//import { authenticate, register } from '../api/AuthApi.js';
//import axios from 'axios';

import { usePosts } from './PostsContext'
import { Link } from 'react-router-dom'

export default function PostList() {
  
  // get posts from database (.get = usePosts())
  const posts = usePosts()

  return <>
    {posts.slice(0).reverse().map(post => (
      <Post post={post} key={post.id} />
    ))}
  </>
}





// Specific Post Thread
export function ThreadPost() {
  let id = window.location.search.slice(1)
  const posts = usePosts()

  posts.find(post => post.id === id)

  return (
    <div>bruh</div>
  )
}






function Post({ post }) {
/*
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
    <Card sx={{ maxWidth: 5000, margin: 4 }}>
      <CardHeader
        title={post.title}
        subheader={post.poster_name}
      />

      <CardContent>
        <Typography
          variant="body4"
          color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="favorite-post">
          <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite sx={{ color: "#002E5A" }} />}/>
        </IconButton>

        <Typography paddingRight={1}>
          {post.likes}
        </Typography>

        <Link to="PostComments?id=${post.id}">
          <IconButton>
            <Message/>
          </IconButton> 
        </Link>

        <Tooltip title="Delete">
          <IconButton>
            <Delete/>
          </IconButton>
        </Tooltip>

      </CardActions>
    </Card>
  )
}