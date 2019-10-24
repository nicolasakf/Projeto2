import axios from "axios";

const api = axios.create({
  // baseURL: "http://10.0.1.21:3600/"
  // baseURL: "http://10.92.101.170:3600/"
  baseURL: "http://localhost:3600/"

});


export default api;