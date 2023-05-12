import { Box } from '@mui/material'
import React from 'react'
import Add from './Add'

import { PostsProvider } from './PostsContext'
import PostList from './Post'

export default function Dashboard() {

  return (
    <Box flex={6} padding={2}>
      <PostsProvider>
        <Add/>
        <PostList/>
      </PostsProvider>
    </Box>
  )
}
