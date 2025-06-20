import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const imageApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000, 
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

imageApi.interceptors.request.use((config) => {
  if (config.method === "put" && config.data instanceof FormData) {
    config.data.append("_method", "PUT");
    config.method = "post";
  }
  return config;
});

// Interceptor untuk menambahkan token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export { api, imageApi };
