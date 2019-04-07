import React from 'react';
import { connect } from 'react-redux';
import Product from './Product';

const Products = ({ products }) => {
    return (
        <ul className="mt-4 list-group">
            {
                products.map(product => (
                    <li key={product.id} className="list-group-item">
                        <div>
                            <h6>{product.name}</h6>
                        </div>
                        <div>
                            <i>Product Manager</i>
                        </div>
                        <div>
                            <Product product={product} />
                        </div>
                    </li>
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

export default connect(mapStateToProps)(Products);
