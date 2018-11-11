import { RECEIVE_MESSAGE, SEND_MESSAGE } from '../../../actionTypes';


const sendMessageAction = (message) => ({
    type: SEND_MESSAGE,
    message: message
})