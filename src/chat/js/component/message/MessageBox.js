import React from 'react';
import Avatar from '../avatar/Avatar';
import LoadingSVG from '../../../img/loading.svg';

import BoyDefault from '../../../img/boy_default.jpg';
import GirlDefault from '../../../img/girl_default.jpg';



export default class MessageBox extends React.Component{
    
    constructor(props){
        super(props);
        this.info = this.props.info;
    }
    
    
    formatTime(timestamp){
        let time = new Date(timestamp);
        let hours = time.getHours()>9 ? time.getHours() : '0'+time.getHours();
        let minu = time.getMinutes()>9 ? time.getMinutes() : '0'+time.getMinutes();
        let sec = time.getSeconds()>9 ? time.getSeconds() : '0'+time.getSeconds();
        return hours+':'+minu+':'+sec;
    }

    avatarCreate(sex){
        if(sex === 0){
            return BoyDefault
        }else{
            return GirlDefault
        }
    }

    loadCreate(){
        return this.info.isLoading?
            <span className = {'message-loading-' + this.info.dir}>
                <img className = 'message-loading-image' src = {LoadingSVG} />
            </span>
            :null
    }

    render(){
        let {userName, dir, avatar, messageTimestamp, sex} = this.info;
        let time = this.formatTime(messageTimestamp);
        return(
            <div data-flex={'dir:'+dir} className="message-list-item">
                <div data-flex={'dir:'+dir} data-flex-box = '0' className = 'message-container'>
                    <div data-flex-box = '0' data-flex = 'main:top cross:top' className = 'avatar-container'>
                        <Avatar
                            src = {this.avatarCreate(sex)}
                            size = {39}
                            userName = {userName}
                            mode = {dir}
                        />
                    </div>
                    <div style = {{
                        padding:'0 10px',
                        width: '100%',
                        textAlign:dir
                    }}>
                        <span className = 'message-nickname-box'>
                            <span className = 'message-nickname'>{userName}</span>
                            <span>{time}</span>
                        </span>
                        <div className = 'message'>
                            {
                                dir==='right'?this.loadCreate():null
                            }
                            {this.props.messageContent}
                            {
                                dir==='left'?this.loadCreate():null
                            }
                            <div className = {dir === 'left' ? 'triangle-left-outer' : 'triangle-right-outer'}></div>
                            <div className = {dir === 'left' ? 'triangle-left-inner' : 'triangle-right-inner'}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}