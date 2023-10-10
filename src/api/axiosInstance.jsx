import axios from "axios";
const serverInstance = axios.create({
  baseURL: "https://e-libbackend.onrender.com/",
});

export default serverInstance;
