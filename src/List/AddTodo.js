import {addTodo} from "./actions";
import React from 'react';
import {connect} from 'react-redux';

export const AddTodo = ({dispatch}) => {

    let input;
    return (

        <div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!input.value.trim()) {
                        console.log("test")
                        return;
                    }
                    dispatch(addTodo(input.value))
                    input.value = "";
                }}
            >
                <input
                    ref={node => input = node}
                ></input>
                <button type="submit">
                    addTodo
                </button>
            </form>
        </div>
    )
}

export default connect()(AddTodo)