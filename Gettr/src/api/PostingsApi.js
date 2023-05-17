import axios from 'axios';

function getPosts(token) {
    return axios.get('http://localhost:8080/post/getPosts',
    {
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    })
}

function getPost(token, id){
    return axios.get('http://localhost:8080/post/getPost' + `/${id}`,
    {
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    })
}

function newPost(title, description, username, token){
    return axios.post('http://localhost:8080/post/newPost',
        {
            "title": title,
            "description": description,
            "username": username
        },
        {
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`
            }
        }
    )
}

function upVote(id, token){
    return axios.put('http//localhost:8080/post/upVotePost' + `/${id}`,
    {
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    })
}

function addComment(userId, postId, text, token){
     return axios.post('http//localhost:8080/post/addComment',
     {
        "user_id": userId,
        "post_id": postId,
        "text": text
     },
     {
         headers:{
             "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*",
             "Authorization": `Bearer ${token}`
         }
     })
}

function deletePost(token, id){
    return axios.delete('http//localhost:8080/post/deletePost' + `/${id}`, {
        headers:{
             "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*",
             "Authorization": `Bearer ${token}`
        }
    })
}

export { getPosts, getPost, newPost, upVote, addComment, deletePost };


