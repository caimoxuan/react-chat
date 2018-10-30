import React from 'react';

import BoyDefault from '../../../img/boy_default.jpg';
import GirlDefault from '../../../img/girl_default.jpg';


export default class UserInlineBox extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userId: props.userInfo.userId,
            userName: props.userInfo.userName,
            avatar: props.userInfo.avatar,
            sex: props.userInfo.sex,
        }
    }

    handlerAvatar(){
        if(this.state.avatar){
            return this.state.avatar;
        }
        return this.state.sex == 0 ? BoyDefault : GirlDefault;
    }

    render(){
        return(
            <div className="user_inline_box">
                <img src={this.handlerAvatar()} />
                {this.state.userName}
            </div>
        )
    }


}