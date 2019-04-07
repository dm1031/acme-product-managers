import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setManager } from './store';

class Product extends Component {
    constructor(props) {
        super(props)
        if (props.product.managerId) {
            this.state = {
                currManager: props.product.managerId
            }
        }
        else {
            this.state = {
                currManager: ''
            }
        }
    }
    handleClick() {
        const { product } = this.props
        product.managerId = this.state.currManager;
        this.props.set(product)
    }
    render() {
        const { users } = this.props;
        return (
            <div>
                <select value={this.state.currManager} onChange={(ev) => this.setState({ currManager: ev.target.value || null })} className="form-control">
                    <option value="">--none--</option>
                    {
                        users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))
                    }
                </select>
                <div>
                    <button type="submit" className="mt-3 btn btn-primary" onClick={() => this.handleClick()}>Save</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set: (product) => dispatch(setManager(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
