import {RECEIVE_MESSAGE,
    SEND_MESSAGE,
    INIT_WEBSOCKET,
    CHANGE_ROOM_INFO,
    ADD_ROOM_MESSAGE,
    UPDATE_ROOM_MESSAGE} from '../../../actionTypes';


export const initWebSocketAction = (webSocket) => ({
    type: INIT_WEBSOCKET,
    webSocket: webSocket,
})


export const sendMessageAction = (message) => ({
    type: SEND_MESSAGE,
    message: message
})

export const onMessageAction = (message) => ({
    type: RECEIVE_MESSAGE,
    message: message,
})

export const changeRoomInfo = (roomInfo) => ({
    type: CHANGE_ROOM_INFO,
    roomInfo: roomInfo,
})

export const addRoomMessage = (roomId, message) => ({
    type: ADD_ROOM_MESSAGE,
    roomId: roomId,
    message: message,
})

export const updateRoomMessage = (roomId, messageList) => ({
    type: UPDATE_ROOM_MESSAGE,
    roomId: roomId,
    messageList: messageList,
})