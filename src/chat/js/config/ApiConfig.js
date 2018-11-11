import '../axios'
import {message} from 'antd';

/** 登录返回用户基本信息 */
export const LoginApi = function(data, callback) {
    let api = '/accountLogin';
    window.Axios.post(api, data).then(function(res){
        if(res.data.success){
            callback(res.date);
        }else{
            message.error(res.data.message);
        }
    }).catch(function(error){
        console.log(error);
        message.error('System error, please try later!');
    })
};

export const LogoutApi = function(callback){
    let api = '/logout';
    window.Axios.post(api).then(function(res){
        if(res.data.success){
            callback(true);
        }
    }).catch(function(error){
        message.error('logout fail, please try later or close window directly');
    })
}
