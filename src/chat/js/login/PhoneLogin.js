import React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {LoginApi} from '../config/ApiConfig';

const FormItem = Form.Item;

/**
 * phone login
 * @param {event} e
 */
class PhoneLogin extends React.Component {
    /**
     * @param {event} e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let form = {'username': values['phone'],
                    'password': values['password'],
                    'type': 'phone'};
                LoginApi(form, (data) => {
                    if(data.success){
                        this.props.history.push("/chat");
                    }
                });
            }
        });
    }

    /**
     * @return {html}
     */
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}
                  className="login-form margin-top-25">
                <FormItem>
                    {getFieldDecorator('phone', {
                        rules: [{required: true, message: '请输入你的手机号!'}],
                    })(
                        <Input size='large'
                               prefix={<Icon type="mobile"
                                             style={{color: 'rgba(0,0,0,.25)'}}
                               />}
                               placeholder="手机号"/>
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
                            className="login-form-button margin-top-15">
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

PhoneLogin.propTypes = {
    form: PropTypes.object,
    history: PropTypes.object,
};

const WrappedNormalLoginForm = Form.create()(PhoneLogin);

export default withRouter(connect((state, props) => ({}), (dispatch) => ({
    indexAction: bindActionCreators(LoginApi, dispatch),
}))(WrappedNormalLoginForm));
