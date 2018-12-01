import React from 'react';
import { Layout } from 'antd';
// import CharArea from './js/component/area/ChatArea'
import LoginUserHeader from './js/login/LoginUserHeader';
import CharContainer from './js/container/ChatContainer';

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
                        <CharContainer />
                    </Content>
                </Layout>
            </div>
        )
    }
}