import React from 'react';
import { connect } from 'react-redux';

const Home = ({ products }) => {
    const areOpenings = products.filter(product => !product.managerId)
    return (
        <div>
            <div>
                We {areOpenings.length ? 'HAVE' : 'DO NOT HAVE'} openings for Product Manager!
            </div>
            <div>
                The following openings are available:
                <ul>
                    {
                        areOpenings ? areOpenings.map(product => (
                            <li key={product.id}>
                                {product.name}
                            </li>
                        )) : ''
                    }
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home)
