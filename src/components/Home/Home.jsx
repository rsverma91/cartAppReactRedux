import React, {
    Component,
} from 'react';

import { Link } from 'react-router-dom';
// Component styles
require('./home.scss');

/**
 * Represents Home container
 * @class
 */
class Home extends Component {
    constructor() {
        super();
        this.state = { isApiLoading: true };
        this.onItemClick = this.onItemClick.bind(this);
        !localStorage.getItem('itemInCart') && localStorage.setItem('itemInCart', '{}');
        this.itemInCart = JSON.parse(localStorage.getItem('itemInCart'));
    }
    componentDidMount() {
        this.props.fetchCartDetails();
    }
    componentWillReceiveProps(newProps) {
        this.setState(newProps.cartDetails);
    }
    onItemClick(e) {
        if (e.target.id === 'add_to_cart') {
            let index = e.target.getAttribute('data-index');
            let selectedItem = this.state.cartData[index];
            this.itemInCart[selectedItem.id] = { count: 1 };
        } else if (e.target.id === 'remove_from_cart') {
            let index = e.target.getAttribute('data-index');
            let selectedItem = this.state.cartData[index];
            delete this.itemInCart[selectedItem.id];
        }
        localStorage.setItem('itemInCart', JSON.stringify(this.itemInCart));
        this.setState({});
    }
    render() {
        return (
            <div>
                <Link to="/cart" className="cart-img">Go to cart</Link>
                <div className="title">All Items</div>
                <div>
                    {this.state.isApiLoading ?
                        (<div>Loading</div>) :
                        (<div className="items-list">
                            <ul onClick={this.onItemClick}>
                                {
                                    this.state.cartData.map((item, index) => {
                                        return <li key={'item_' + index} data-id={item.id}>
                                            <div className="img">
                                                <img src={item.img_url} />
                                            </div>
                                            <div className="details">
                                                <label>{item.name} ({item.type})</label>
                                                <div className="pricing">
                                                    <div>
                                                        {
                                                            item.discount ? [<span className="org-prc">₹{item.price}</span>, <span>₹{item.price - item.discount}</span>] :
                                                                [<span>₹{item.price}</span>]
                                                        }
                                                    </div>
                                                    {
                                                        Object.keys(this.itemInCart).indexOf('' + item.id) === -1 ?
                                                            <button id="add_to_cart" data-id={item.id} data-index={index}>Add to cart</button> :
                                                            <button id="remove_from_cart" data-id={item.id} data-index={index}>Remove</button>
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>)
                    }
                </div>
            </div>
        );
    }
}
export default Home;