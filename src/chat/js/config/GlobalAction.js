import '../axios'
import {message} from 'antd';
import {createBrowserHistory as createHistory} from 'history';

const history = createHistory();
/** 登录返回用户基本信息 */
export const LoginAction = function(data) {
    let api = '/accountLogin';
    window.Axios.post(api, data).then(function(res){
        if(res.data.success){
            console.log('log success')
            history.push('/chat');
        }else{
            message.error(res.data.message);
        }
    }).catch(function(error){
        console.log(error);
        message.error('System error, please try later!');
    })
};

export const LogOut = function(){
    let api = '/logout';
    window.Axios.post(api).then(function(res){
        if(res.data.success){
            history.push('/login');
        }
    }).catch(function(error){
        message.error('logout fail, please try later or close window directly');
    })
}
