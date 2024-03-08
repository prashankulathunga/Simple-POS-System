import axios, {AxiosInstance} from "axios";
import BASE_URL from "./apiConfig.ts";

const instance:AxiosInstance = axios.create({
    baseURL:BASE_URL
});

instance.interceptors.request.use(
    (config)=>{
        // token

        let token = document.cookie.split('; ').find(record=>record.startsWith('token=')) || null;

        token = token?.split('=')[1];
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error)=>{return Promise.reject(error)}
)

export default instance;