import { Favorite, FavoriteBorder, Delete, Message } from '@mui/icons-material'
import { Card, CardHeader, IconButton, CardContent, Typography, CardActions, Checkbox, Tooltip } from '@mui/material'
import React from 'react'

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


export function deletePost() {
  //const userMatchA = getPost()
  //const userMatchB = localStorage.getItem("")

  //if (userMatchA == userMatchB) {
    //localStorage.removeItem(<Post/>)

    //getPosts.removeItem(<Post/>)
  //}

  return
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
        <IconButton aria-label="favorite-post">
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "#002E5A" }} />} />
        </IconButton>

        <Typography paddingRight={1}>
          {post.likes}
        </Typography>

        <Link to="PostComments?id=${post.id}">
          <IconButton>
            <Message/>
          </IconButton>
        </Link>

        <div>
          <Tooltip title="Delete">
            <IconButton onClick={deletePost}>
              <Delete />
            </IconButton>
          </Tooltip>
        </div>

      </CardActions>
    </Card>
  )
}