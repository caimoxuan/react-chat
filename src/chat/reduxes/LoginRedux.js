import {UPDATE_LOGOUT_USER, UPDATE_LOGIN_USER} from "../../actionTypes";

export function LoginRedux(state={userName:"cmx"}, action) {
    switch(action.type){
        case UPDATE_LOGIN_USER:
            return {
                ...action.user
            };
        case UPDATE_LOGOUT_USER:
            return {};
        default:
            return{ ...state};
    }
}