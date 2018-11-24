import config from '../config/PropertiesConfig';
import {message} from 'antd';

const webSocket = new WebSocket(config.chatSocketServerAddress);

webSocket.onerror = function (e) {
    message.error("can not connect to server!");
}

webSocket.onopen = () => {
    message.success("success connect to server!");
    var data = {
        "msgId": (new Date()).getTime(),
        "messageType": "LOGIN",
        "timeStamp": (new Date()).getTime(),
        "msgContext": "react user coming!",
        "sendUser": 888
    };
    var login = JSON.stringify(data);
    webSocket.send(login)
}


webSocket.onclose = (event) => {
    console.log("WebSocket is closed");
};

export default webSocket;