import React from 'react';

import '../../../css/common/avatar.less'

/**
 *  avatar
 */
export default class Avatar extends React.Component {
    /**
     * @param {object} props
     */
    constructor(props) {
        super(props);
        this.state = {};
    }

    /**
     * @param {event} e
     */
    handleClick(e) {
        let {userName, mode, addExpression, getUserInfo} = this.props;
        alert(mode);
        mode = mode === 'left' ? 'menu' : 'profile';
        if (e.shiftKey) {
            userName === '' ? null : addExpression('@' + userName + ' ');
        } else {
            switch (mode) {
                case 'profile': {
                    userName === '' ? null : getUserInfo(userName);
                    break;
                }
                case 'menu': {
                    let x = e.pageX,
                        y = e.pageY,
                        winX = window.innerWidth,
                        winY = window.innerHeight,
                        menuX = 150,
                        menuY = 162;
                    if (menuX > winX - x) {
                        x = x - (menuX + x - winX) - 15;
                    }
                    if (menuY > winY - y) {
                        y = y - (menuY + y - winY) - 15;
                    }
                    this.setState({
                        x: x,
                        y: y,
                        isShowMenu: true,
                    });
                    break;
                }
                default:
                    break;
            }
        }
    }

    handleMenuClose() {
        this.setState({isShowMenu: false});
    }

    handleAt(userName) {
        userName === '' ? null : this.props.addExpression('@' + userName + ' ');
    }

    // handleShieldToggle(userName) {
    //     this.props.setShieldUser({
    //         user: userName,
    //         isAdd: true,
    //     });
    //     this.props.storageSetting();
    // }
    render() {
        let isShowMenu = this.state.isShowMenu;
        let {size, src, mode, userName, getUserInfo, radius} = this.props;
        return (
            <div>
                <img
                    className='avatar'
                    style={{
                        width: size + 'px',
                        height: size + 'px',
                        float: mode,
                        borderRadius: radius + 'px' || '50%',
                    }}
                    src={src}
                    onClick={(e) => this.handleClick(e)}
                >
                </img>
                {
                    !isShowMenu ? null
                        : <div className='avatar-menu-box' onClick={() => this.handleMenuClose()}>
                            <ul
                                className='avatar-ul'
                                style={{
                                    left: this.state.x + 'px',
                                    top: this.state.y + 'px',
                                }}
                            >
                                <li className='avatar-li' onClick={() => {
                                    this.handleAt(userName);
                                }}>@TA
                                </li>
                                <li className='avatar-li' onClick={() => getUserInfo(userName)}>查看个人资料</li>
                                <li className='avatar-li'
                                    onClick={() => this.props.changeRoom({curRoom: userName, isPrivate: true})}>发送消息
                                </li>
                            </ul>
                        </div>
                }
            </div>

        );
    }
}
