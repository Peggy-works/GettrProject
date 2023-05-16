import { createContext, useContext, useReducer } from 'react';

// Context: manage state globally
// Dispatch: Update Component 
const PostsContext = createContext(null);
const PostsDispatchContext = createContext(null);

// Deals w/Posts
export function PostsProvider({ children }) {
    const [posts, dispatch] = useReducer(
        postsReducer,

        // replace with local storage / database
        initialPosts
        
    );

    return (
        <PostsContext.Provider value={posts}>
            <PostsDispatchContext.Provider value={dispatch}>
                {children}
            </PostsDispatchContext.Provider>
        </PostsContext.Provider>
    );
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
                username: action.username
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

// Test Posts
const initialPosts = [
    {
        id: 1052,
        title: "testing posting 1",
        description: "Hello world1, im here.",
        likes: 10,
        poster_id: 1951,
        poster_name: "Peggster",
        usernames: ["Peggster","Peggster"],
        comments: ["damn finals suck", "get off the fucking main branch"]
    },
    {
        id: 1053,
        title: "testing posting 2",
        description: "Hello",
        likes: 9,
        poster_id: 1952,
        poster_name: "Mijo",
        usernames: ["Peggster", "Peggster"],
        comments: ["damn son", "soooooooooooooooooooooooo......................"]
    },
    {
        id: 1054,
        title: "testing posting 3",
        description: "Hola soy dora",
        likes: 2,
        poster_id: 1953,
        poster_name: "Bruh",
        usernames: ["Mijo", "Peggster"],
        comments: ["yolo", "thats crazy"]
    }
];