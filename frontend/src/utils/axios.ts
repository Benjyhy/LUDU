import axios from 'axios';
import { API_URL } from '@env';
import { apiErrorResponse } from '../models/apiResponse';
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
    return response;
  },
  (error: any) => {
    console.log('RESPONSE');
    console.log(error.response.data.message);
    return Promise.reject(error.response.data.message);
  },
);

export default api;
