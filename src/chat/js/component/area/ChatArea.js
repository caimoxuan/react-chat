import React from 'react'

import TextMessage from '../message/TextMessage';
import UserList from '../user/UserList';
import webSocket from '../../socket/WebSocket';
import chatMessage from '../message/proto/ChatMessage_pb';

import '../../../css/common/scroll.less';
import '../../../css/chat/chat_window.less';

export default class ChatArea extends React.Component {

    constructor(props) {
        super(props);
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
        //初始化webSocket
        webSocket.onmessage = (event) => {
            let reader = new FileReader();
            reader.readAsArrayBuffer(event.data);
            reader.onload = (eve) => {
                if(eve.target.readyState===FileReader.DONE){
                    let buf = new Uint8Array(eve.target.result);
                    let message = chatMessage.ChatMessage.deserializeBinary(buf).toObject();
                    console.log(message);
                    if(message.routerDispatch.fromUser === this.props.userInfo.userName){
                        let messageList = this.props.messageStore.byId[this.props.roomInfo.roomId];
                            messageList.forEach((value, index) => {
                                if (message.messageId === value.messageId) {
                                    messageList[index].isLoading = false;
                                    this.props.updateRoomMessage(this.props.roomInfo.roomId, messageList);
                                }
                            })
                    }
                }
            }
        };
        this.props.initWebSocket(webSocket);
        //初始化默认房间
        this.props.changeRoomInfo({roomId: 1});
    }


    sendMessage = (e) => {

        if (13 === e.keyCode && e.ctrlKey) {
            let text = this.state.textContent;
            this.setState({textContent: text});
            return;
        }
        if (this.state.textContent.trim() === '') {
            return;
        }

        if (e.keyCode === 13) {
            this.addMessage()
        }
    };

    handlerToggleRoom = (roomInfo) => {
        this.props.changeRoomInfo(roomInfo);
    };

    addMessage = () => {
        let message = new chatMessage.ChatMessage();
        message.setMessageId(this.state.score);
        message.setMessageContext(this.state.textContent);
        message.setMessageType(1001);
        message.setMessageTimestamp(new Date().getTime());
        let routerDispatch = new chatMessage.ChatMessage.RouterDispatch();
        routerDispatch.setFromUser(this.props.userInfo.userName);
        message.setRouterDispatch(routerDispatch);
        let msg = message.toObject();
        msg.isLoading = true;
        msg.dir="right";
        this.setState({score: this.state.score + 1});
        this.props.addRoomMessage(this.props.roomInfo.roomId, msg);
        this.props.webSocket.send(message.serializeBinary());
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
                            (messageStore.byId[roomInfo && roomInfo.roomId || this.state.roomId] || []).map(value => (
                                <TextMessage key={value.messageId} content={value.messageContext} info={value}/>
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
        overflowY: 'auto',
        padding: '5px',
        boxShadow: 'inset 0 0 3px 3px #ccc',
        borderRadius: '0px 5px 5px 0px',
    }
}