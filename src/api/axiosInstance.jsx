import axios from "axios";
const serverInstance = axios.create({
  baseURL: 'https://elibrarybackend.onrender.com' 
});

export default serverInstance;