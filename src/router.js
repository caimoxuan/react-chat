import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
import {object} from 'prop-types';
import lodable from 'react-loadable';


/**
 * Router with lazy loaded pages
 */
export default class Router extends React.Component {
    static contextTypes = {
        store: object,
    };

    /**
     * @param {Object} props
     * @param {Object} context
     */
    constructor(props, context) {
        super(props);

        this.ListPage = lodable({
            loader: () => {
                return import('./List/container');
            },
            loading: () => {
                return <div>Loading...</div>;
            },
        });

        this.loginPage = lodable({
            loader: () => {
                return import('./chat/js/login');
            },
            loading: () => {
                return <div>Loading...</div>;
            },
        });
        this.chatPage = lodable({
            loader: () => {
                return import('./chat/js/component/area/ChatArea');
            },
            loading: () => {
                return <div>Loading...</div>;
            },
        });
    }

    /**
     * @return {Component}
     */
    render() {
        return (
            <Switch>
                <Route exact path="/" component={this.ListPage}/>
                <Route exact path="/login" component={this.loginPage}/>
                <Route exact path="/chat" component={this.chatPage}/>
            </Switch>
        );
    }
}
