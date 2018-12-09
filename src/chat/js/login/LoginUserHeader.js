import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {LogoutAction} from "../actions/LoginAction";
import {Menu, Icon, Dropdown} from 'antd';
import default_girl from '@/chat/img/girl_default.jpg';
import default_boy from '@/chat/img/boy_default.jpg';


class LoginUserHeader extends React.Component {

    render(){
        let{user, logoutAction} = this.props;
        return(
            <div className="headBar">
                <img style={logoStyle}
                     src=""/>
                <div style={userStyle}>
                    <img style={headStyle} src={user ? user.avatar : user && user.sex || '0' == '0' ? default_boy : default_girl} />
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item key="0">
                                    <a href="#">2nd menu item</a>
                                </Menu.Item>
                                <Menu.Item key="1">
                                    <a href="/login" onClick={logoutAction}>退出</a>
                                </Menu.Item>
                            </Menu>
                        } trigger={['click']}
                        placement="bottomCenter">
                            <a className="ant-dropdown-link" href="#">
                                <Icon type="down" />
                                <span style={{color: 'white', marginLeft: '3px'}}>{user ? user.userName : "test"}</span>
                            </a>
                        </Dropdown>
                </div>
            </div>
        )
    }
}

export default connect((state, props)=>({}), (dispatch)=>({
    logoutAction: bindActionCreators(LogoutAction, dispatch)
}))(LoginUserHeader)


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
    borderLeft: '1px solid white',
    paddingLeft: '10px',
}