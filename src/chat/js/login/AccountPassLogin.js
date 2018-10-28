import React from 'react';
import {Button, Checkbox, Form, Icon, Input} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as GlobalAction from '../config/GlobalAction';

/**
 * Form Item
 */
const FormItem = Form.Item;

/**
 * login AccountPassLogin
 * @param {event} e
 */
class AccountPassLogin extends React.Component {
    /**
     * mounted
     */
    componentDidMount() {
        console.log('start account login');
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    /**
     * @return {html}
    */
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}
                  className="login-form margin-top-25">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: '请输入你的邮箱!'}],
                    })(
                        <Input size='large'
                               prefix={<Icon type="user"
                                             style={{color: 'rgba(0,0,0,.25)'}}
                               />}
                               placeholder="Email"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入你的密码!'}],
                    })(
                        <Input size='large'
                               prefix={<Icon type="lock"
                                             style={{color: 'rgba(0,0,0,.25)'}}
                               />}
                               type="password"
                               placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>自动登录</Checkbox>
                    )}
                    <Link to="/resetPass" className="login-form-forgot">
                        忘记密码
                    </Link>
                    <Button size='large' type="primary"
                            htmlType="submit"
                            className="margin-top-15 login-form-button">
                        登录
                    </Button>
                    <Link to="/register" className="login_register" href="">
                        注册账户
                    </Link>
                </FormItem>
            </Form>
        );
    }
}

AccountPassLogin.propTypes = {
    form: PropTypes.object,
};

const WrappedNormalLoginForm = Form.create()(AccountPassLogin);

export default connect((state, props) => ({}), (dispatch) => ({
    indexAction: bindActionCreators(GlobalAction, dispatch),
}))(WrappedNormalLoginForm);
