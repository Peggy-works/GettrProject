import { createContext, useContext, useReducer } from 'react';

// useContext: manage state globally
// Dispatch: Update Component 
const PostsContext = createContext(null);
const PostsDispatchContext = createContext(null);

// Deals w/Posts
export function PostsProvider({ children }) {
    const [posts, dispatch] = useReducer(
        postsReducer,
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
    { id: 0, title: "Project A", description: "bruh", username: "[userA]"},
    { id: 1, title: "Project B", description: "deez", username: "[userB]"},
    { id: 2, title: "Project C", description: "yeat", username: "[userC]"}
];