import React, {
    Component,
} from 'react';

import { Link } from 'react-router-dom';

// Component styles
require('./cart.scss');

/**
 * Represents Cart container
 * @class
 */
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props.cartDetails };

        this.modifyItem = this.modifyItem.bind(this);

        !localStorage.getItem('itemInCart') && localStorage.setItem('itemInCart', '[]');
        this.itemInCart = JSON.parse(localStorage.getItem('itemInCart'));

    }
    componentDidMount() {
        this.props.fetchCartDetails();
    }
    componentWillReceiveProps(newProps) {
        this.setState(newProps.cartDetails);
    }
    modifyItem(e) {
        if (e.target.className.indexOf('minus') >= 0) {
            let index = e.target.getAttribute('data-index');
            let selectedItem = this.state.cartData[index];
            if (!--this.itemInCart[selectedItem.id].count) {
                delete this.itemInCart[selectedItem.id];
            };
        }
        else if (e.target.className.indexOf('plus') >= 0) {
            let index = e.target.getAttribute('data-index');
            let selectedItem = this.state.cartData[index];
            this.itemInCart[selectedItem.id].count++;
        }
        else if (e.target.className.indexOf('delete') >= 0) {
            let index = e.target.getAttribute('data-index');
            let selectedItem = this.state.cartData[index];
            delete this.itemInCart[selectedItem.id];
        }
        localStorage.setItem('itemInCart', JSON.stringify(this.itemInCart));
        this.setState({});
    }
    render() {
        let _this = this;
        let sum = this.state.cartData.reduce((result, item) => {
            if (Object.keys(_this.itemInCart).indexOf('' + item.id) >= 0)
                return result + (item.price * _this.itemInCart['' + item.id].count);
            else return result;
        }, 0);
        let discount = this.state.cartData.reduce((result, item) => {
            if (Object.keys(_this.itemInCart).indexOf('' + item.id) >= 0)
                return result + (item.discount * _this.itemInCart['' + item.id].count);
            else return result;
        }, 0);
        return (
            <div>
                <label className="cart-img">Go to cart</label>
                <div className="title">Order Summary</div>
                {
                    this.state.isApiLoading ?
                        (<div>Loading</div>) :
                        (<div className="cart-wrap">
                            <div className="cart-items">
                                <div className="item-head">
                                    <span className="col-1">Item ({Object.keys(_this.itemInCart).length})</span>
                                    <span className="col-2">Qty</span>
                                    <span className="col-3">Price</span>
                                </div>
                                {Object.keys(_this.itemInCart).length > 0 ?
                                    <ul onClick={this.modifyItem}>
                                        {
                                            this.state.cartData.map((item, index) => {
                                                return Object.keys(_this.itemInCart).indexOf('' + item.id) >= 0 ?
                                                    <li key={'item_' + index} data-id={item.id}>
                                                        <div className="col-1">
                                                            <span>{item.name}</span>
                                                            <span data-id={item.id} data-index={index} className="delete">X</span>
                                                        </div>
                                                        <div className="col-2">
                                                            <span data-id={item.id} data-index={index} className="minus">-</span>
                                                            {_this.itemInCart[item.id].count}
                                                            <span data-id={item.id} data-index={index} className="plus">+</span>
                                                        </div>
                                                        <div className="col-3">₹{item.price}</div>
                                                    </li> : null
                                            })
                                        }
                                    </ul> : <div className="no-item">No item in cart, go back to <Link to='/'>Home page</Link></div>
                                }
                            </div>
                            <div className="price-brkup">
                                <label>Total</label>
                                <label>
                                    <span>Item ({Object.keys(_this.itemInCart).length})</span>
                                    <span>₹{sum}</span>
                                </label>
                                <label>
                                    <span>Discount</span>
                                    <span>₹{discount}</span>
                                </label>
                                <label>
                                    <span>Order Total</span>
                                    <span>₹{sum - discount}</span>
                                </label>
                            </div>
                        </div>)
                }
            </div>
        );
    }
}
export default Cart;