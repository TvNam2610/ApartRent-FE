import axios from "axios";
const apiRequest = axios.create({
    baseURL: "http://localhost:8800/api",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export default apiRequest