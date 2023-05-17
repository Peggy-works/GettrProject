import { createContext, useContext, useReducer } from 'react'
import { getPosts } from '../api/PostingsApi.js'

// Context: manage state globally
// Dispatch: Update Component 
const PostsContext = createContext(null);
const PostsDispatchContext = createContext(null);

// Deals w/Posts
export function PostsProvider({ children }) {
    const [posts, dispatch] = useReducer(
        postsReducer,
        postArray
    )
    return (
        <PostsContext.Provider value={posts}>
            <PostsDispatchContext.Provider value={dispatch}>
                {children}
            </PostsDispatchContext.Provider>
        </PostsContext.Provider>
    )
}

// Reads Posts (globally)
export function usePosts() {
    return useContext(PostsContext)
}

// Manage Post (globally)
export function usePostsDispatch() {
    return useContext(PostsDispatchContext)
}

// Post Editing
function postsReducer(posts, action) {
    switch (action.type) {
        case 'added': {
            return [...posts, {
                id: action.id,
                title: action.title,
                description: action.description,
                username: action.username,
                likes: action.likes,
                poster_id: action.poster_id,
                poster_name: action.poster_name,
                usernames: action.usernames,
                comments: action.comments
            }];
        }
        case 'deleted': {
            return posts.filter(p => p.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


function callDatabase () {
getPosts(JSON.parse(localStorage.getItem('user')).token)
    .then(response => {
        setTimeout(30000)
            postArray = response.data

            // comment out after test
            console.log(postArray)
        })
}

let postArray = []
callDatabase(postArray)
