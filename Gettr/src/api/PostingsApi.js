import axios from 'axios';

function getPosts() {
    return new Promise((resolve,reject) =>{
        axios.get('http://localhost:8080/post/getPosts/'+JSON.parse(localStorage.getItem('user')).id,
        {
            headers: {
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        }).then((response) => {
            //console.log(response.data);
            resolve(response.data);
        })
        .catch((error) =>{
            console.log(error);
            reject(error);
        })
    });
}

async function fetchPosts(){
    try{
        const posts = await getPosts();
        return posts;
    } catch (error){
        console.log(error);
    }
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
            "username": JSON.parse(localStorage.getItem('user')).username,
            "userId": JSON.parse(localStorage.getItem('user')).id
        },
        {
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        }
    )
}

function upVote(id,request){
    return new Promise((resolve,reject) =>{
        axios.put('http://localhost:8080/post/upVotePost' + `/${id}`,request,{
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        })
    })
}

function addComment(postId, text){
     return axios.post('http://localhost:8080/post/addComment',
     {
        "user_id": JSON.parse(localStorage.getItem('user')).id,
        "post_id": postId,
        "text": text
     },
     {
         headers:{
             "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*",
             "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
         }
     })
}


function deleteComment(commentId){
    return axios.delete('http://localhost:8080/post/deleteComment/'+commentId, 
        {
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
}

function deletePost(id){
    return new Promise((resolve,reject) =>{
        axios.delete('http://localhost:8080/post/deletePost' + `/${id}`, {
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        }).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            console.log(error);
            reject(error);
        })
    })
}

function isLiked(postId){
    return new Promise((resolve,reject) => {
        axios.get('http://localhost:8080/post/isLiked/'+postId+'/'+JSON.parse(localStorage.getItem('user')).id,{
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            console.log(error);
            reject(error);
        })
    })
}

export { fetchPosts, getPosts, getPost, newPost, upVote, addComment, deletePost, isLiked, deleteComment};


