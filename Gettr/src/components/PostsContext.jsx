import { createContext, useContext, useEffect, useReducer } from 'react'
import { fetchPosts, isLiked } from '../api/PostingsApi.js'

// Context: manage state globally
// Dispatch: Update Component 
export const PostsContext = createContext(null);
export const PostsDispatchContext = createContext(null);

export function PostsProvider({ children }) {
    const [posts, dispatch] = useReducer(
      postsReducer,
      {
        postArr: [],
        likeMap: new Map()
      }
    )
  
    useEffect(() =>{
      const init = async()=>{
        const postData = await fetchPosts();
        const tempMap = new Map();
          postData.forEach( async (value)=>{
            if(await isLiked(value.id)){
              tempMap.set(value.id,true);
            }
            else{
              tempMap.set(value.id,false);
            }
          });
        dispatch({type:"initialFetch",postArr:postData,likeMap:tempMap});
      }
      init();
    },[])
  
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
            return {
              postArr : posts.postArr.push( {
                id: action.id,
                title: action.title,
                description: action.description,
                username: action.username,
                likes: action.likes,
                poster_id: action.poster_id,
                poster_name: action.poster_name,
                usernames: action.usernames,
                comments: action.comments,
                liked:false
            }),
            likeMap: posts.likeMap.set(action.id,false)
          }
        }
        case 'deleted': {
            return posts.filter(p => p.id !== action.id);
        }
        case 'initialFetch':{
            return{ postArr: action.postArr,
                    likeMap: action.likeMap}
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
  }


