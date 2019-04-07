import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ location, products, users }) => {
    const managers = users.reduce( (acc, user) => {
        products.forEach( (product) => {
            if (product.managerId === user.id && acc.indexOf(user) === -1) {
                acc.push(user)
            }
        })
        return acc;
    }, []);
    
    const links = [
        {
            type: 'Home',
            path: '/',
            key: 1
        },
        {
            type: 'Products',
            path: '/products',
            key: 2
        },
        {
            type: 'Managers',
            path: '/users',
            key: 3
        }
    ]

    return (
        <ul className="nav nav-pills">
            {
                links.map(link => (
                    <Link to={link.path} key={link.key} className={location.pathname === link.path ? 'nav-link active' : 'nav-link'}>{link.type}{link.type === 'Managers' ? ` (${managers.length})` : ''}</Link>
                ))
            }
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        users: state.users
    }
}

export default connect(mapStateToProps)(Nav);
