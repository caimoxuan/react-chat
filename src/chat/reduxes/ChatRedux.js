import { INIT_WEBSOCKET, RECEIVE_MESSAGE, SEND_MESSAGE } from "../../actionTypes";

export function charRedux(state={}, action) {
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