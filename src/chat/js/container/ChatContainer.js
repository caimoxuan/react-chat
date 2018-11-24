import { initWebSocketAction, sendMessageAction, onMessageAction, changeRoomInfo,addRoomMessage  } from '../actions/ChatAction';
import { connect } from 'react-redux';
import ChatArea from '../component/area/ChatArea';

const mapStateToProps = state => {
    return {
        webSocket: state.chatRedux.webSocket,
        messageStore: state.messageRedux,
        roomInfo: state.changeRoomInfoRedux,
    }
}

const mapDispatchToPorps = dispatch => ({
    initWebSocket: webSocket => dispatch(initWebSocketAction(webSocket)),
    sendMessage: message => dispatch(sendMessageAction(message)),
    onMessgae: message => dispatch(onMessageAction(message)),
    changeRoomInfo: roomInfo => dispatch(changeRoomInfo(roomInfo)),
    addRoomMessage: (roomId, message) => dispatch(addRoomMessage(roomId, message)),
});

export default connect(mapStateToProps, mapDispatchToPorps)(ChatArea);

