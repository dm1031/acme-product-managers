import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts, fetchUsers } from './store';
import Nav from './Nav';
import Products from './Products';
import Managers from './Managers';
import Home from './Home';

class App extends Component {
    componentDidMount() {
        this.props.fetchProducts()
        this.props.fetchUsers();
    }
    render() {
        const { products, users } = this.props;
        return (
            <Router>
                <div>
                    <h1>Acme Product Managers</h1>
                    <Route component={ Nav } />
                    <Route component={ Home } path="/" exact />
                    <Route component={ Products } path="/products" />
                    <Route component={ Managers } path="/users" />
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    const { products, users } = state;
    return {
        products,
        users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
