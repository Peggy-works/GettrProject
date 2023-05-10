import { Favorite, FavoriteBorder, Delete, Message } from '@mui/icons-material'
import { Card, CardHeader, IconButton, CardContent, Typography, CardActions, Checkbox, Tooltip } from '@mui/material'
import React from 'react'

import { usePosts } from './PostsContext'

export default function PostList() {
  const posts = usePosts()
  return <>(
      {posts.map (post => (
          <Post post={post} key={post.id} />
      ))}
  )
  </>
}


function Post({post}) {

  return (
    <Card sx={{ maxWidth: 5000 , margin: 2 }}>
      <CardHeader
        title={post.title}
        subheader={post.username}
      />
      <CardContent>
        <Typography
          //{desc.name} (move to inside typography)
          variant="body2"
          color="text.secondary">
        {post.description}
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