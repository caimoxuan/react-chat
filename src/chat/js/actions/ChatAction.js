import { RECEIVE_MESSAGE, SEND_MESSAGE, INIT_WEBSOCKET } from '../../../actionTypes';


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