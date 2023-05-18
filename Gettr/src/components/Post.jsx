import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material'
import { Card, CardHeader, IconButton, CardContent, Typography, CardActions, Checkbox, Tooltip } from '@mui/material'
import React from 'react'

import { usePosts } from './PostsContext'
import { deletePost } from '../api/PostingsApi.js'

export default function PostList() {
  const posts = usePosts()

  return <>  
    {posts.slice(0).reverse().map(post => (
      <Post post={post} key={post.id} />
    ))}
  </>
}

// Deletes Post (Database)
export function Deletepost(postID) {
    deletePost(localStorage.getItem("token"), postID)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    setTimeout(6000)
    window.location.reload()
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


// Make a Post using post formData (post)
function Post({ post }) {
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
        <IconButton>
          <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite sx={{ color: "#002E5A" }} />} />
        </IconButton>

        <Typography>
        </Typography>

        <div>
          <Tooltip title="Delete">
            <IconButton
            onClick={()=>{Deletepost(`${post.id}`)}}>
              <Delete/>
            </IconButton>
          </Tooltip>
        </div>

      </CardActions>
    </Card>
  )
}