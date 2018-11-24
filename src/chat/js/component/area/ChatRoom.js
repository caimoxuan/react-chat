import React from 'react';
import UserInlineBox from '../user/UserInlineBox';

export default class ChatRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomId: props.roomInfo.roomId,
            roomCount: props.roomInfo.roomCount,
            roomName: props.roomInfo.roomName,
        }
    }

    getRoomInfo = () => {
        return {
            roomId: this.state.roomId,
            roomName: this.state.roomName,
            roomCount: this.state.roomCount,
        }
    }

    render() {
        return (
            <div onClick={() => this.props.toggleRoom(this.getRoomInfo())}>
                <UserInlineBox roomInfo={this.props.roomInfo}/>
            </div>
        )

    }


}

