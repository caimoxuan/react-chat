import { INIT_WEBSOCKET, RECEIVE_MESSAGE, SEND_MESSAGE, CHANGE_MESSAGE_LIST } from "../../actionTypes";

export function chatRedux(state={}, action) {
    switch(action.type){
        case INIT_WEBSOCKET:
            return {
                ...state,
                webSocket: action.webSocket,
            }
        case RECEIVE_MESSAGE:
            return {
                ...state,

            }
        case SEND_MESSAGE:
            return {
                ...state,
            }
        default:
            return {
                ...state,
            }
    }
}

export function messageListRedux(state=[], action) {
    switch(action.type) {
        case CHANGE_MESSAGE_LIST:
            return [
                ...action.messageList
            ]
        default:
            return [];
    }
}
