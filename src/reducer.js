/**
 * This module composes root reducer including react-router
 * @requires redux
 * @requires react-router-redux
 */
import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import {ADD_TODO, TOGGLE_TODO} from "./actionTypes";
import {LoginRedux} from "./chat/reduxes/LoginRedux";
import {chatRedux, messageListRedux} from './chat/reduxes/ChatRedux';

/**
 * App reducer maintain states to be shared across modules
 * @param  {Object} state - Previous leaf node of redux store
 * @param  {string} state.cityCode - City code, hangzhou => 330100
 * @param  {Object} action - Redux action
 * @return {Object}
 */
const app = (state = {city: 330100}, action) => {
    return state;
};

const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id: action.id,
                    completed: false,
                    text: action.text,
                }]
        case TOGGLE_TODO:
            return state.map(todo => (todo.id === action.id) ? {...todo, completed: !todo.completed} : todo)
        default:
            return state;
    }

}

/**
 * This is a create reducer function
 * It returns current permanent and asynchronously loaded reducers
 * @param  {function} asyncReducers - asynchronously loaded recuders
 * @return {object} - root reducer
 */
export default function createReducer() {
    /**
     * Return root reducer
     * Name of each leaf store should match Page Name or Functionality Name
     */
    return combineReducers({
        // Permanent redux reducers
        router,
        app,
        todos,
        LoginRedux,
        chatRedux,
        messageListRedux,
    });
}
