import React from 'react'
import {message} from 'antd';

import TextMessage from '../message/TextMessage';
import UserList from '../user/UserList';

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
        this.state.webSocket = new WebSocket("ws://localhost:8888/")
        this.state.webSocket.onerror = function(e){
            message.error("can not connect to server!");
        }
    }




    onMessage = () => {
        console.log("find message");
        let messageId = 'test-'+(this.state.score - 1);
        this.state.info.forEach((value, index) => {
            if(value.messageId == messageId){
                let _info = this.state.info;
                _info[index].isLoading = false;
                this.setState({info: _info});
            }
        })
    }

    sendMessage = (e) => {

        if (13 == e.keyCode && e.ctrlKey) {
            let text = this.state.textContent;
            this.setState({textContent: text});
            return;
        }
        if(this.state.textContent.trim() == ''){
            return;
        }

        if (e.keyCode == 13) {
            this.addMessage()
        }

    }

    addMessage = () => {
        let dir = Math.random() < 0.5 ? "right" : "left";
        let m = this.state.textContent;
        let info_t = {
            userName: "cmx",
            userId: new Date().getTime(),
            messageId: 'test-'+ this.state.score,
            dir: dir,
            timestamp: new Date().getTime(),
            isLoading: true,
            sex: 0,
            message: m ? m : 'test'
        }
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
                                <TextMessage key={value.userId} content={value.message} info={value}/>
                            ))
                        }
                    </div>
                    <div className="chat_send_head">
                        <div className="chat_send_button" onClick={this.addMessage}>发送</div>
                        <div className="chat_send_button" onClick={this.onMessage}>调试</div>
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