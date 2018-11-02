import '../axios'
import {message} from 'antd';
import {createBrowserHistory as createHistory} from 'history';

const history = createHistory();

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
