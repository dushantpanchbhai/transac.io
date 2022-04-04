import axios from "axios";
const axiosInstance = axios.create({
    baseURL: 'https://transac1.herokuapp.com'
});

export default axiosInstance;
