import { Favorite, FavoriteBorder, Delete } from '@mui/icons-material'
import { Card, CardHeader, IconButton, CardContent, Typography, CardActions, Checkbox, Tooltip } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

import { PostsContext, usePosts,usePostsDispatch } from './PostsContext'
import { deletePost ,fetchPosts, getPosts,upVote} from '../api/PostingsApi.js'



export default function PostList() {

const posts = useContext(PostsContext);
  console.log(posts.likeMap.size);
  return <>  
    
        {posts !== undefined && posts.postArr.slice(0).reverse().map(post => (
        <Post post={post} key={post.id} />
        ))}
    
  </>
}

// Deletes Post (Database)
export function Deletepost(postID) {
    deletePost(postID)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    //setTimeout(6000)
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

function Post({post}) {
    const [postLikes,setPostLikes] = useState(post.likes);

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
            { post.liked?
                <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite sx={{ color: "#002E5A" }} />} defaultChecked onChange={async(event) =>{
                if(event.target.checked){setPostLikes(postLikes+1);await upVote(`${post.id}`,
                {
                    like: true,
                    userId: JSON.parse(localStorage.getItem('user')).id
                });}
                else{setPostLikes(postLikes-1);await upVote(`${post.id}`,
                {
                    like: false,
                    userId: JSON.parse(localStorage.getItem('user')).id
                });}
                }} />
                :
                <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite sx={{ color: "#002E5A" }} />} onChange={async(event) =>{
                if(event.target.checked){setPostLikes(postLikes+1);await upVote(`${post.id}`,
                {
                    like: true,
                    userId: JSON.parse(localStorage.getItem('user')).id
                });}
                else{setPostLikes(postLikes-1);await upVote(`${post.id}`,
                {
                    like: false,
                    userId: JSON.parse(localStorage.getItem('user')).id
                });}
                }} />
            }
            </IconButton>
            

            <Typography>
                {postLikes}
            </Typography>
            { post.poster_id === JSON.parse(localStorage.getItem('user')).id &&
            <div>
                <Tooltip title="Delete">
                <IconButton
                onClick={async()=>{
                    await deletePost(`${post.id}`);
                    window.location.reload()
                }}>
                    <Delete/>
                </IconButton>
                </Tooltip>
            </div>
            }
        </CardActions>
        </Card>
    )
}

