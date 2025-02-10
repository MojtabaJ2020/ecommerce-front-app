import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080", // Backend URL
  withCredentials: true, // Sends cookies automatically
});


export default api;