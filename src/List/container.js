import {connect} from 'react-redux';

import TodoList from './TodoList';
import {
    toggleTodo,
} from './actions';


const mapStateToProps = state => {
    return {
        todos: state.todos
    };
};

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id))
});


@connect(mapStateToProps, mapDispatchToProps)
/**
 * Connected react component
 */
export default class Container extends TodoList {

}
