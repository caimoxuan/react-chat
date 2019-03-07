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
        //初始化webSocket
        webSocket.onmessage = (event) => {
            console.log("get websocket message ");
            console.log(event.data);
            let reader = new FileReader();
            reader.readAsArrayBuffer(event.data);
            reader.onload = (eve) => {
                if(eve.target.readyState===FileReader.DONE){
                    let buf = new Uint8Array(eve.target.result);
                    let message = chatMessage.ChatMessage.deserializeBinary(buf).toObject();
                    console.log(message);
                    if(message.routerDispatch.fromUser === 'cmx'){
                        let messageList = this.props.messageStore.byId[this.props.roomInfo.roomId];
                        console.log(messageList);
                            messageList.forEach((value, index) => {
                                if (message.messageId === value.msgId) {
                                    messageList[index].isLoading = false;
                                    this.setState({info: messageList});
                                    console.log(messageList);
                                }
                            })
                    }
                }
            }
            // if (jsonMessage.dir === 'right') {
            //     let messageList = this.props.messageStore.get(this.props.roomInfo.roomId);
            //     messageList.forEach((value, index) => {
            //         if (jsonMessage.msgId === value.msgId) {
            //             messageList[index].isLoading = false;
            //             this.setState({info: _info});
            //         }
            //     })
            // } else {
            //     this.props.addRoomMessage(this.props.roomInfo.roomId, jsonMessage);
            // }
        }
        this.props.initWebSocket(webSocket);

        //初始化默认房间
        this.props.changeRoomInfo({roomId: 1});
    }

    updateMessage = () => {
        let jsonMessage = {msgId: this.state.score - 1, dir: 'right',}
        if (jsonMessage.dir === 'right') {
            let messageList = this.props.messageStore.byId[this.props.roomInfo.roomId];
            messageList.forEach((value, index) => {
                if (jsonMessage.msgId === value.msgId) {
                    messageList[index].isLoading = false;
                    console.log(messageList);
                    this.props.updateRoomMessage(this.props.roomInfo.roomId, messageList);
                }
            })
        } else {
            console.log("test" + jsonMessage)
            this.props.addRoomMessage(this.props.roomInfo.roomId, jsonMessage);
        }
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
    }

    handlerToggleRoom = (roomInfo) => {
        this.props.changeRoomInfo(roomInfo);
    }

    addMessage = () => {
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
            msgContext: 'test'
        }
        let message = new chatMessage.ChatMessage();
        message.setMessageId(this.state.score);
        message.setMessageContext(this.state.textContent);
        message.setMessageType(1001);
        let routerDispatch = new chatMessage.ChatMessage.RouterDispatch();
        routerDispatch.setFromUser("cmx");
        message.setRouterDispatch(routerDispatch);
        this.setState({score: this.state.score + 1});
        this.props.addRoomMessage(this.props.roomInfo.roomId, info_t);
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
                                <TextMessage key={value.msgId} content={value.msgContext} info={value}/>
                            ))
                        }
                    </div>
                    <div className="chat_send_head">
                        <div className="chat_send_button" onClick={this.sendMessage}>发送</div>
                        <div className="chat_send_button" onClick={this.updateMessage}>测试</div>
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