import {
    FETCH_SOME_ASYNC_REQUEST,
    FETCH_SOME_ASYNC_SUCCEED,
    FETCH_SOME_ASYNC_FAILURE,
    ADD_TODO,
    TOGGLE_TODO,
} from './actionTypes';

var nextId = 0;
export const addTodo = (text) => ({
    type: ADD_TODO,
    text: text,
    completed: false,
    id: nextId++,
});

export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id: id,
})


export const fetchSomeAsyncRequest = () => (
    {
        type: FETCH_SOME_ASYNC_REQUEST,
    }
);

export const fetchSomeAsyncSucceed = () => (
    {
        type: FETCH_SOME_ASYNC_SUCCEED,
        // payload: {
        //   response,
        // },
    }
);

export const fetchSomeAsyncFailure = () => (
    {
        type: FETCH_SOME_ASYNC_FAILURE,
    }
);
