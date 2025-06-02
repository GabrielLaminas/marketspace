import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.41:3333",
  timeout: 6000,
});

api.interceptors.response.use(
  (response) => response,
  (responseError) => {   
    if(responseError.response && responseError.response.data){
      return Promise.reject(new Error(responseError.response.data.message));
    } else {
      return Promise.reject(responseError);
    }   
  }
)

export default api;