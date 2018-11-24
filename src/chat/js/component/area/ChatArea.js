import React from 'react'

import TextMessage from '../message/TextMessage';
import UserList from '../user/UserList';
import webSocket from '../../socket/WebSocket';

import '../../../css/common/scroll.less';
import '../../../css/chat/chat_window.less';

export default class ChatArea extends React.Component {

    constructor(props) {
        super(props);
        console.log("chatserver:" + JSON.stringify(props))
        this.users = [{userId: 1, userName: "user@1"}, {userId: 2, userName: "user@2"}];
        this.state = {
            info: [],
            scrollHeight: 0,
            scroll: {},
            textContent: '',
            score: 1,
            roomId: 1,
            webSocket: {},
        };
    }

    componentDidUpdate() {
        //将滚动条置底
        this.scroll.scrollTop = this.scroll.scrollHeight;
    }

    componentDidMount() {
        this.props.initWebSocket(webSocket);
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

    handlerToggleRoom = (roomInfo) => {
        this.props.changeRoomInfo(roomInfo);
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
        this.setState({score: this.state.score + 1})
        this.props.addRoomMessage(this.props.roomInfo.roomId, info_t);
        this.props.webSocket.send(JSON.stringify(info_t))
        this.state.textContent = '';
    }

    render() {
        let {messageStore, roomInfo} = this.props;
        return (
            <div className="chat_panel">
                <div className="list_panel">
                    <UserList toggleRoom={roomInfo => this.handlerToggleRoom(roomInfo)}/>
                </div>
                <div className="chat_window">
                    <div style={style.messageBar} ref={node => this.scroll = node}>
                        {
                            (messageStore.get((roomInfo&&roomInfo.roomId||this.state.roomId)) || []).map(value => (
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