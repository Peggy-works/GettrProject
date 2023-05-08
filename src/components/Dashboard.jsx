import { Box } from '@mui/material'
import React from 'react'  
import Post from './Post'
import Add from './Add'

const Dashboard = () => {

  return ( 
    <Box flex={6} padding={2}>
      <Add/>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </Box>
  )
}

export default Dashboard