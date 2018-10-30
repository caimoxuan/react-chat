import React from 'react';
import UserInlineBox from './UserInlineBox';
import '../../../css/chat/user_list.less';

export default class UserList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            uList:[{userId: '123', userName: "测试人员1"},{userId: '234', userName: '测试人员2'}],
        }
    }




    render() {
        return (
            <div className="user_list">
                <ul>
                {
                    this.state.uList.map(value => (
                        <li className="li_user" key={value.userId}>
                            <UserInlineBox key={value.userId} userInfo={value} />
                        </li>
                    ))
                }
                </ul>
            </div>
        )
    }


}