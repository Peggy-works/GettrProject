import { Box } from '@mui/material'
import React from 'react'
import Add from './Add'

import { PostsProvider } from './PostsContext'
import PostList from './Post'
import ResponsiveAppBar from './Nav'

export default function Dashboard() {
  return (
    <Box flex={6}>
      <ResponsiveAppBar/>
      <PostsProvider>
        <Add/>
        <PostList/>
      </PostsProvider>
    </Box>
  )
}
