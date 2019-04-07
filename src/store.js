import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
    products: [],
    users: []
}

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_USERS = 'SET_USERS';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {...state, products: action.products};
        case SET_USERS:
            return {...state, users: action.users}
        default:
           return state;
    }
}

const setProducts = (products) => {
    return {
        type: SET_PRODUCTS,
        products
    }
}

const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const fetchProducts = () => {
    return (dispatch) => {
        return axios.get('/api/products')
            .then(response => response.data)
            .then(products => dispatch(setProducts(products)))
    }
}

export const fetchUsers = () => {
    return (dispatch) => {
        return axios.get('/api/users')
            .then(response => response.data)
            .then(users => dispatch(setUsers(users)))
    }
}

export const setManager = (product) => {
    return (dispatch) => {
        return axios.put(`/api/products/${product.id}`, product)
            .then( () => dispatch(fetchProducts()))
    }
}

export default createStore(reducer, applyMiddleware(thunk))

