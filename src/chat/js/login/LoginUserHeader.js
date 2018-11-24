import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {LogoutAction} from "../actions/LoginAction";

class LoginUserHeader extends React.Component {

    render(){
        let{user, logoutAction} = this.props;
        return(
            <div className="headBar">
                <img style={logoStyle}
                     src=""/>
                <div style={userStyle}>
                    <img style={headStyle} src={user ? user.avatar : ""} />
                    <span>{user ? user.userName : "test"}</span>
                    <i
                        onClick={logoutAction}
                        style={angleStyle}></i>
                </div>
            </div>
        )
    }
}

export default connect((state, props)=>({}), (dispatch)=>({
    logoutAction: bindActionCreators(LogoutAction, dispatch)
}))(LoginUserHeader)


const angleStyle = {
    width:0,
    border: "10px solid transparent",
    borderTop: "10px solid black"
}

const headStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
}

const logoStyle = {
    width: "30px",
    height: "30px",
}

const userStyle  = {
    display: "inline-block",
    float: "right",
}