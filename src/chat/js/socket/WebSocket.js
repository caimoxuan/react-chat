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

webSocket.onmessage = (event) => {
    let jsonMessage = JSON.parse(event.data);
    if (jsonMessage.dir == 'right') {
        this.state.info.forEach((value, index) => {
            if (jsonMessage.msgId == value.msgId) {
                let _info = this.state.info;
                _info[index].isLoading = false;
                this.setState({info: _info});
            }
        })
    } else {
        let _info = this.state.info;
        _info.push(jsonMessage);
        this.setState({info: _info});
    }
}

webSocket.onclose = (event) => {
    console.log("WebSocket is closed");
};

export default webSocket;