import React from 'react'

import TextMessage from "../message/TextMessage";

import "../../../css/common/scroll.less";

export default class ChatArea extends React.Component {

    constructor(props) {
        super(props);
        this.users = [{userId: 1, userName: "user@1"}, {userId: 2, userName: "user@2"}];
        this.chater = {id: 1001, name: "user1", message: "测试信息"}
        this.state = {
            info: [],
            scrollHeight: 0,
            scroll: {},
            textContent:'',
        };
    }

    componentDidUpdate() {
        //将滚动条置底
        this.scroll.scrollTop = this.scroll.scrollHeight;
    }

    sendMessage = (e) => {
        if (13 == e.keyCode && e.ctrlKey){
            let text = this.state.textContent;
            text +=`&;#13;&;#10;`
            this.setState({textContent: text});
            return;
        }

        if(e.keyCode == 13){
            this.addMessage()
        }

    }

    addMessage = ()=> {
        let dir = Math.random() < 0.5 ? "right":"left";
        let m =  this.state.textContent;
        let info_t = {userName: "cmx", userId: new Date().getTime(), dir: dir, timestamp: new Date().getTime(), isLoading: true, sex: 0, message: m ? m : 'test'}
        let infoList = this.state.info;
        infoList.push(info_t);
        this.setState({info: infoList,textContent:''});
    }

    render() {
        return (
            <div className="test_d">
                <div style={style.messageBar} ref={node => this.scroll = node}>
                    {
                        this.state.info.map(value => (
                            <TextMessage key={value.userId} content={value.message} info={value}/>
                        ))
                    }
                </div>
                <div className="chat_send_head">
                </div>
                <div className="chat_send_content" >
                    <textarea
                        value={this.state.textContent.trim()}
                        placeholder="请输入聊天信息"
                        rows="4"
                        className="my_textarea resize-no"
                        onChange={(e)=>{
                            this.setState({textContent:e.target.value})
                        }}
                        onKeyDown={this.sendMessage}
                    ></textarea>
                    <div onClick={this.addMessage}>发送</div>
                </div>

            </div>
        )
    }
}

const style = {
    messageBar: {
        width:'100%',
        height: '300px',
        overflowY: 'scroll'
    }
}