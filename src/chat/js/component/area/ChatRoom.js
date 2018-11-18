import React from 'react';
import UserInlineBox from '../user/UserInlineBox';

export default class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messageList: [],
            roomId: 0,
            roomCount: 0,
            roomName: '',
        }
    }

    render() {
        return (
            <UserInlineBox/>
        )

    }


}

