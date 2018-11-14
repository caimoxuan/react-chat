import { initWebSocketAction, sendMessageAction, onMessageAction } from '../actions/ChatAction';
import { connect } from 'react-redux';
import ChatArea from '../component/area/ChatArea';

const mapStateToProps = state => {
    return {
        webSocket: state.webSocket,
        messageList: state.messageList,
    }
}

const mapDispatchToPorps = dispatch => ({
    initWebSocket: webSocket => dispatch(initWebSocketAction(webSocket)),
    sendMessage: message => dispatch(sendMessageAction(message)),
    onMessgae: message => dispatch(onMessageAction(message))
});

export default connect(mapStateToProps, mapDispatchToPorps)(ChatArea);

