import { Box } from '@mui/material'

import { PostsProvider } from './PostsContext'
//import { ThreadPost } from './Post'

import React from 'react'
import ResponsiveAppBar from './Nav'

// function - display array w/comments for posts
// function - button to add comments (similar to add?)

function PostComments() {
  return (
    <Box flex={6}>
      <ResponsiveAppBar/>
      <PostsProvider>
        <div>Post Comments</div>
        {/* <ThreadPost/> */}
      </PostsProvider>
    </Box>
  )
}

export default PostComments