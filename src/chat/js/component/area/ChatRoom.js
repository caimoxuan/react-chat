import React from 'react';

export default class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messageList: {},
            roomId: 0,
            roomCount: 0,
            roomName: '',
        }
    }


}

