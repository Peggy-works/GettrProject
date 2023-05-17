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

function deletePost(token){
    return axios.post('http')
}

export { getPosts, getPost };


