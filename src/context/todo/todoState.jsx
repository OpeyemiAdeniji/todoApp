import React, { useReducer } from 'react';
import Axios from 'axios';
import { useHistory } from "react-router";

import TodoReducer from './todoReducer';
import TodoContext from './todoContext';

import Body from "../../components/helpers/body";
import storage from '../../components/helpers/storage';

import {
    GET_USER_TODOS,
    GET_TODO,
    SET_LOADING
} from '../types';

const TodoState = props => {

    const initialState = {
        todos: [],
        todo: {},
        loading: false
    }

    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        Body.dismissBackground('dash-body');
        history.push('/login');
    }

    const [ state, dispatch ] = useReducer(TodoReducer, initialState);

    const getUserTodos = async (userId, limit) => {
        
        setLoading();

        await Axios.get(`${process.env.REACT_APP_TODO_URL}/todos/user/${userId}?${limit ? 'limit='+limit : ''}&sort=-desc`, storage.getConfigWithBearer())
        .then((resp) => {

            dispatch({
                type: GET_USER_TODOS,
                payload: resp.data.data
            })

        }).catch((err) => {
            console.log(`could not get user todos ${err}`);
        })
    }

    const getTodo = async (todoId) => {

        setLoading();

        await Axios.get(`${process.env.REACT_APP_TODO_URL}/todos/${todoId}`, storage.getConfigWithBearer())
        .then((resp) => {

            dispatch({
                type: GET_TODO,
                payload: resp.data.data
            })

        }).catch((err) => {
            console.log(`could not get todo ${err}`);
        })

    }

    const setLoading = () => { dispatch({ type: SET_LOADING })} 

    return <TodoContext.Provider
        value={{
            todos: state.todos,
            todo: state.todo,
            getUserTodos,
            getTodo
        }}
    >

        { props.children }

    </TodoContext.Provider>
}

export default TodoState