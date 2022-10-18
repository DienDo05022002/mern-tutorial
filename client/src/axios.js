import axios from 'axios';
export const ACCESS_TOKEN_NAME = 'hahahahaha'
const http = axios.create({
    baseURL:"http://localhost:3030",
    headers:{Authorization: `Bearer ${localStorage.getItem('hahahahaha')}`},
    // withCredentials: true,
})
// const http = axios.create({
//     baseURL:"http://localhost:3030/"
// })
// export default http
// export default axios.create({
//     baseURL: 'http://localhost:3030',
//     headers:{Authorization: `Bearer ${localStorage.getItem('hahahahaha')}`}
// });
// const http = axios.create({
//     baseURL:"http://localhost:3030/",
//     headers:{Authorization: `Bearer ${authToken?.access}`}
// })
// const baseURL= 'http://localhost:3030'

// export function http() {
//     axios.interceptors.request.use(request => {
//         const account = localStorage.getItem('hahahahaha')
//         const isLoggedIn = account?.token;
//         const isApiUrl = request.url.startsWith(process.env.REACT_API == 'http://localhost:3030');
//         console.log(isApiUrl)

//         if (isLoggedIn && isApiUrl) {
//             request.headers.common.Authorization = `Bearer ${account.token}`;
//         } 
//         else {
//             delete request.defaults.headers.common.Authorization 
//         }
//         return request;
//     });
// }
//const authToken = localStorage.getItem('hahahahaha') //? JSON.parse(localStorage.getItem('hahahahaha')) : null


// http.interceptors.request.use(async req => {
//     const authToken = localStorage.getItem('hahahahaha') 
//     if(authToken) {
//         authToken = localStorage.setItem('hahahahaha',authToken)  //? JSON.parse(localStorage.getItem('hahahahaha')) : null
//         req.headers.Authorization = `Bearer ${authToken}`
//     }
//     return req
// })
// http.interceptors.response.use(
//     (response) => {
//         const { token } = response.data;
//         console.log(token)
//         //login
//         if(token) {
//             window.localStorage.setItem('hahahahaha', token)
//         }
//         return response
//     }
// ) 
export default http;