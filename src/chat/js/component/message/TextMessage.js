import React from 'react';
import MessageBox from './MessageBox';

export default class TextMessage extends React.Component{

    constructor(props){
        super(props);
    }

    dealContent(content){
        let text = content;
        text = text.replace(/&/g,'&amp').replace(/\"/g,'&quot').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\'/g,'&apos;');
        let regLink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        let regExp = /#\([\u4e00-\u9fa5a-z]+\)/g;
        text = text.replace(regExp, r => `<img src="images/expressions/${r.match(/[^#()]+/)[0]}.png" alt="${r}" onerror="this.style.display=\'none\'"/>` );
        text = text.replace(regLink, r => `<a href="${r}" target="_blank" rel="noreferrer">${r}</a>`);
        return text
    }

    render(){
        let text = this.dealContent(this.props.content);
        return(
            <MessageBox
                info = {this.props.info}
                messageContent = {
                    <span dangerouslySetInnerHTML={{__html: text}}></span>
                }
            />
        )
    }


}