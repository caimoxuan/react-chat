import { initWebSocketAction, sendMessageAction, onMessageAction, changeMessageList } from '../actions/ChatAction';
import { connect } from 'react-redux';
import ChatArea from '../component/area/ChatArea';

const mapStateToProps = state => {
    return {
        webSocket: state.chatRedux.webSocket,
        messageList: state.messageListRedux,
    }
}

const mapDispatchToPorps = dispatch => ({
    initWebSocket: webSocket => dispatch(initWebSocketAction(webSocket)),
    sendMessage: message => dispatch(sendMessageAction(message)),
    onMessgae: message => dispatch(onMessageAction(message)),
    changeMessageList: messageList => (changeMessageList(messageList))
});

export default connect(mapStateToProps, mapDispatchToPorps)(ChatArea);

