import { Box } from '@mui/material'
import React from 'react'  
import Post from './Post'

const Feed = () => {

  return (
    
    <Box flex={6} padding={2}>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </Box>
  )
}

export default Feed