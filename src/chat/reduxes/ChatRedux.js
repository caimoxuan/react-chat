import {INIT_WEBSOCKET,
    RECEIVE_MESSAGE,
    SEND_MESSAGE,
    CHANGE_ROOM_INFO,
    ADD_ROOM_MESSAGE,
    UPDATE_ROOM_MESSAGE} from "../../actionTypes";
import {Map} from 'Immutable'

export function chatRedux(state = {}, action) {
    switch (action.type) {
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

export function changeRoomInfoRedux(state = {}, action) {
    switch (action.type) {
        case CHANGE_ROOM_INFO:
            console.log(action.roomInfo);
            return {
                ...action.roomInfo
            }
        default:
            return state;
    }
}

export function messageRedux(state = new Map(), action) {
    let copyState = state.asMutable();
    switch (action.type) {
        case ADD_ROOM_MESSAGE:
            let messageList = state.get(action.roomId) || [];
            messageList.push(action.message);
            copyState.set(action.roomId, messageList);
            return copyState;
        case UPDATE_ROOM_MESSAGE:
            copyState.set(action.roomId, action.messageList);
            return copyState;
        default:
            return state;
    }
}
