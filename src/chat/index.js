import React from 'react';
import { Layout } from 'antd';
import CharArea from './js/component/area/ChatArea'
import LoginUserHeader from './js/login/LoginUserHeader';

const {Header, Footer, Content} = Layout;

export default class Chat extends React.Component {

    render(){
        return(
            <div>
                <Layout>
                    <Header>
                        <LoginUserHeader/>
                    </Header>
                    <Content>
                        <CharArea />
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </div>
        )
    }
}