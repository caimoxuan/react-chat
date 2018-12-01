import {INIT_WEBSOCKET,
    RECEIVE_MESSAGE,
    SEND_MESSAGE,
    CHANGE_ROOM_INFO,
    ADD_ROOM_MESSAGE,
    UPDATE_ROOM_MESSAGE} from "../../actionTypes";

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

const initMessageState = {
    byId: {
    }
}

export function messageRedux(state = initMessageState, action) {
    switch (action.type) {
        case ADD_ROOM_MESSAGE:
            return {
                byId: {
                    ...state.byId,
                    [action.roomId]: [
                        ...state.byId[action.roomId] || [],
                        action.message,
                    ]
                }
            }
        case UPDATE_ROOM_MESSAGE:
            return {
                byId: {
                    ...state.byId,
                    [action.roomId]: action.messageList
                }
            }
        default:
            return state;
    }
}
