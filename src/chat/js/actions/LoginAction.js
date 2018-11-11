import {UPDATE_LOGIN_USER, UPDATE_LOGOUT_USER} from "../../../actionTypes";


export const LoginAction = (userInfo) => (
    {
        type: UPDATE_LOGIN_USER,
        user: userInfo
    }
)

export const LogoutAction = () => ({
    type: UPDATE_LOGOUT_USER,
})
