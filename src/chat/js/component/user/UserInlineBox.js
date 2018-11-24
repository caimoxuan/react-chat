import React from 'react';

import BoyDefault from '../../../img/boy_default.jpg';
import GirlDefault from '../../../img/girl_default.jpg';


export default class UserInlineBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userId: props.roomInfo.roomId,
            userName: props.roomInfo.roomName,
            avatar: props.roomInfo.avatar,
            sex: props.roomInfo.sex,
        }
    }

    handlerClick = () => {

    }

    handlerAvatar(){
        if(this.state.avatar){
            return this.state.avatar;
        }
        return this.state.sex == 0 ? BoyDefault : GirlDefault;
    }

    render(){
        return(
            <div className="user_inline_box" onClick={this.handlerClick}>
                <img src={this.handlerAvatar()} />
                {this.state.userName}
            </div>
        )
    }


}