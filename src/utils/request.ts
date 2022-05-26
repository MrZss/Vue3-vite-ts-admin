import axios from "axios";
import { useUser } from "@/store/user";
import router from '@/router';
import { message } from 'ant-design-vue';

const request = axios.create({
    baseURL: ""
})

request.interceptors.request.use((config: any) => {
    const user = useUser();
    config.headers.Authorization = user.token;


    if (config.method === 'get') {
        config.params = config.params || {};
        config.params._ = new Date().getTime();
    }

    if (config.method === 'post') {
        config.data = config.data || {};
        config.data._ = new Date().getTime();
    }   


    return config;
})

request.interceptors.response.use((response: any) => {
    if (response.data.code === 401) {
        router.push("/login");
        message.error("登录已失效，请重新登录");
        return Promise.reject(response.data.message);
    }

    if (response.data.code !== 200) {
        message.error(response.data.message)
        return Promise.reject(response.data.message);
    }

    return response.data;
})

export default request;