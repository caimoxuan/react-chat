import React from 'react';
import {Tabs} from 'antd';
import AccountPassLogin from './AccountPassLogin';
import PhoneLogin from './PhoneLogin';

const TabPane = Tabs.TabPane;

/**
 * default login
 */
export default class Login extends React.Component {
    /**
     * @param {string} key
     */
    callback(key) {
        console.log('Login callback:' + key);
    }

    /**
     * @return {html}
     */
    render() {
        return (
            <section className="section padding-section"
                     id="components-form-demo-normal-login">
                <div className="container has-text-centered padding-20">
                    <Tabs animated={false} defaultActiveKey="1"
                          size='large'
                          onChange={this.callback.bind(this)}>
                        <TabPane tab="账号密码登录" key="1">
                            <div className="width-368">
                                <AccountPassLogin></AccountPassLogin>
                            </div>
                        </TabPane>
                        <TabPane tab="手机登录" key="2">
                            <div className="width-368">
                                <PhoneLogin></PhoneLogin>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </section>
        );
    }
}
