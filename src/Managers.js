import React from 'react';
import { connect } from 'react-redux';

const Managers = ({ products, users }) => {
    const managers = users.reduce( (acc, user) => {
        products.forEach( (product) => {
            if (product.managerId === user.id && acc.indexOf(user) === -1) {
                acc.push(user)
            }
        })
        return acc;
    }, []);

    return (
        <ul>
           {
               managers.map(manager => (
                   <li key={manager.id}>
                       {manager.name}
                   </li>
               ))
           }
        </ul>
    )
}

const mapStateToProps = (state) => {
    const { products, users } = state;
    return {
        products,
        users
    }
}

export default connect(mapStateToProps)(Managers);
