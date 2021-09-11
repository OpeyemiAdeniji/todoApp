import {
    GET_USER_TODOS,
    GET_TODO,
    SET_LOADING
} from '../types';

export default (state, action) => {

    switch(action.type){

        case GET_USER_TODOS:
            return{
                ...state,
                todos: action.payload,
                loading: false
            }

        case GET_TODO:
            return{
                ...state,
                todo: action.payload,
                loading: false
            }

        case SET_LOADING:
            return{
                ...state,
                loading: true
            }

            default:
                return state;
    }

}