// import axios from 'axios';

// const axiosClient = axios.create({
//     baseURL: 'https://c4d9-113-23-122-165.ngrok-free.app',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// //Interceptors
// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
// });

// export default axiosClient;

import axios from "axios";
export const getProduct = (condition) => {
  const res = axios.post("/prod/client/filter/", condition);
  return res;
};

