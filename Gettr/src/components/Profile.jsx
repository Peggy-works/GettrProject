import { Box } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from './Nav';

import Add from './Add'
import PostList from './Post'
import { PostsProvider } from './PostsContext'

function Profile() {
    
  return (
    <Box>
        <ResponsiveAppBar/>
        <Typography component="h1" variant="h4" align="center" mt={2}>
            Your Posts
        </Typography>
        <PostsProvider>
            <Add/>
            <PostList self={true}/>
      </PostsProvider>
    </Box>
  )
}

export default Profile