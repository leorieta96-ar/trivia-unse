import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://149.50.144.150',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

export default axiosInstance;