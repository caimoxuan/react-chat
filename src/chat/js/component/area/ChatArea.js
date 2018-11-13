import React from 'react'
import {message} from 'antd';

import TextMessage from '../message/TextMessage';
import UserList from '../user/UserList';
import config from '../../config/PropertiesConfig';

import '../../../css/common/scroll.less';
import '../../../css/chat/chat_window.less';

export default class ChatArea extends React.Component {

    constructor(props) {
        super(props);
        this.users = [{userId: 1, userName: "user@1"}, {userId: 2, userName: "user@2"}];
        this.state = {
            info: [],
            scrollHeight: 0,
            scroll: {},
            textContent: '',
            score: 1,
            webSocket: {},
        };
    }

    componentDidUpdate() {
        //将滚动条置底
        this.scroll.scrollTop = this.scroll.scrollHeight;
    }

    componentDidMount() {
        this.state.webSocket = new WebSocket(config.chatSocketServerAddress);
        this.state.webSocket.onerror = function (e) {
            message.error("can not connect to server!");
        }

        this.state.webSocket.onopen = () => {
            message.success("success connect to server!");
            var data = {
                "msgId": (new Date()).getTime(),
                "messageType": "LOGIN",
                "timeStamp": (new Date()).getTime(),
                "msgContext": "react user coming!",
                "sendUser": 888
            };
            var login = JSON.stringify(data);
            this.state.webSocket.send(login)
        }

        this.state.webSocket.onmessage = (event) => {
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

        this.state.webSocket.onclose = (event) => {
            console.log("WebSocket is closed");
        };

    }


    sendMessage = (e) => {

        if (13 == e.keyCode && e.ctrlKey) {
            let text = this.state.textContent;
            this.setState({textContent: text});
            return;
        }
        if (this.state.textContent.trim() == '') {
            return;
        }

        if (e.keyCode == 13) {
            this.addMessage()
        }
    }

    addMessage = () => {
        let m = this.state.textContent;
        let info_t = {
            userName: "cmx",
            userId: new Date().getTime(),
            sendUser: 888,
            msgId: this.state.score,
            dir: 'right',
            timestamp: new Date().getTime(),
            isLoading: true,
            sex: 0,
            messageType: 'USER',
            msgContext: m ? m : 'test'
        }
        this.state.webSocket.send(JSON.stringify(info_t))
        this.setState({score: this.state.score + 1})
        let infoList = this.state.info;
        infoList.push(info_t);
        this.setState({info: infoList, textContent: ''});
    }

    render() {
        return (
            <div className="chat_panel">
                <div className="list_panel">
                    <UserList/>
                </div>
                <div className="chat_window">
                    <div style={style.messageBar} ref={node => this.scroll = node}>
                        {
                            this.state.info.map(value => (
                                <TextMessage key={value.msgId} content={value.msgContext} info={value}/>
                            ))
                        }
                    </div>
                    <div className="chat_send_head">
                        <div className="chat_send_button" onClick={this.sendMessage}>发送</div>
                    </div>
                    <div className="chat_send_content">
                    <textarea
                        value={this.state.textContent.trim()}
                        placeholder="请输入聊天信息"
                        rows="4"
                        className="my_textarea resize-no"
                        onChange={(e) => {
                            this.setState({textContent: e.target.value})
                        }}
                        onKeyDown={this.sendMessage}
                    />
                    </div>
                </div>
            </div>
        )
    }
}

const style = {
    messageBar: {
        width: '100%',
        height: window.innerHeight - 300,
        overflowY: 'scroll',
        padding: '5px',
        boxShadow: 'inset 0 0 3px 3px #ccc',
    }
}