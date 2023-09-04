import { Box } from '@mui/material'
import React, { useEffect , useReducer, useContext, createContext} from 'react'
import Add from './Add'
import PostList from './Post'
import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material'
import { Card, CardHeader, IconButton, CardContent, Typography, CardActions, Checkbox, Tooltip } from '@mui/material'
import { deletePost ,fetchPosts, upVote, isLiked} from '../api/PostingsApi.js'

import { PostsProvider } from './PostsContext'
//import PostList from './Post'
import ResponsiveAppBar from './Nav'

//let postArray = [];



export default function Dashboard() {

  return (
    <Box flex={6}>
      <ResponsiveAppBar/>
      <PostsProvider>
        <Add/>
        <PostList self={false}/>
      </PostsProvider>
    </Box>
  )
}

