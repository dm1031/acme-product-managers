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
    this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(ev) {
        const { product, set } = this.props
        product.managerId = this.state.currManager;
        set(product)
        ev.preventDefault();
    }
    render() {
        const { users } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <select value={this.state.currManager} onChange={(ev) => this.setState({ currManager: ev.target.value || null })} className="form-control">
                    <option value="">--none--</option>
                    {
                        users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))
                    }
                </select>
                <input type="submit" className="mt-3 btn btn-primary" value="Save" />
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set: (product) => dispatch(setManager(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
