import React from 'react';
import {
    object,
    number,
    func,
} from 'prop-types';
import {Link} from 'react-router-dom';
import {hot} from 'react-hot-loader';
import {Button} from 'antd';
import AddTodo from './AddTodo'
import Todo from './Todo'

// @hot(module)
// /**
//  * List Page
//  */
export default class TodoList extends React.Component {

    constructor(props) {
        super(props);
        console.log(JSON.stringify(props));
    }

    /**
     * Render List Page
     * @return {Component}
     */
    render() {
        let {todos, toggleTodo} = this.props;
        return (
            <div>
                <AddTodo/>
                <ul>
                    {todos.map(todo =>
                        <Todo key={todo.id}
                              {...todo}
                              onClick={() => toggleTodo(todo.id)}
                        />
                    )}
                </ul>


            </div>
        );
    }
}

// const TodoList = ({todos, toggleTodo}) => (
//     <div>
//         <AddTodo/>
//         <ul>
//             {todos.map(todo =>
//                 <Todo key={todo.id}
//                       {...todo}
//                       onClick={() => toggleTodo(todo.id)}
//                 />
//             )}
//         </ul>
//     </div>
// )
//
// export default TodoList;