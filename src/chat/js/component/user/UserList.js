import React from 'react';
import ChatRoom from '../area/ChatRoom';
import '../../../css/chat/user_list.less';

export default class UserList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            roomList:[{roomId: 1, roomName: "测试人员1asdasdasdasdasdasdsa"},{roomId: 2, roomName: '测试人员2'}],
        }
    }

    handlUserConnect(user){
        this.roomList.push(user);
    }



    render() {
        return (
            <div className="user_list">
                <ul>
                {
                    this.state.roomList.map(value => (
                        <li className="li_user" key={value.roomId}>
                            <ChatRoom key={value.roomId} roomInfo={value} toggleRoom={roomInfo => this.props.toggleRoom(roomInfo)}/>
                        </li>
                    ))
                }
                </ul>
            </div>
        )
    }


}