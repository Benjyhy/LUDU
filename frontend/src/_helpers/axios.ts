import axios from 'axios';
import { API_URL } from '@env';
// import jwt from "jsonwebtoken"
const api = axios.create({
  baseURL: API_URL,
});

// api.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('player') ? JSON.parse(localStorage.getItem('player')).accessToken : null
//         config.headers['x-access-token'] = token || "_no_user"
//         config.headers['Content-Type'] = 'application/json'

//         return config
//     }, error => {
//         Promise.reject(error)
//     }
// )

api.interceptors.response.use(
  (response: any) => {
    // if (response.status === 401) {
    // }
    return response;
  },
  (error: any) => {
    return Promise.reject(error.message);
  },
);

export default api;
