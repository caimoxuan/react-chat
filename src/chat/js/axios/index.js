import axios from 'axios';
import config from '../config/PropertiesConfig';
import {message} from 'antd';

const qs = require('qs');

//初始化axios
window.Axios = axios.create({
    baseURL: config.chatServerEndPoint,
    timeout: 10000,
    responseType: "json",
    withCredentials: true,
    headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});

//传参序列化(添加拦截器) perHandler
window.Axios.interceptors.request.use(
    config => {
        if(config.method === "post" || config.method === "get" || config.method === "delete"){
            config.data = qs.stringify(config.data);
            console.log(config.data);
        }
        // token Auth
        if(localStorage.token){
            config.headers.Authorization = localStorage.token;
        }
        return config;
    },
    error => {
        message.error(error);
        return Promise.reject(error.data.error.message);
    }
);

window.Axios.interceptors.response.use(
    res => {
        if(res.status != 200){
            message.error({
                showClose: true,
                message: error,
                type: res.data.error.message.message?res.data.message.message : res.data.message
            });
            return Promise.reject(res.data.message);
        }
        return res;
    },
    error => {
        if(error.response) {
            console.log(error.response.status);
            switch(error.response.status){
                case 401: //后台保证登陆失效 或未认证状态下返回401
                    message.error({
                        showClose: true,
                        message: "登陆失效，请重新登陆",
                        type : "error"
                    });
            }
        }
    }
);