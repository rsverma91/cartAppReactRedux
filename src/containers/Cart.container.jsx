import {
    connect
} from 'react-redux'

// Actions
import {
    fetchApi
} from '@actions/home.action.js';

// Component
import Cart from '@components/Cart/Cart';

const mapStateToProps = state => {
    return {
        cartDetails: state.home
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCartDetails: () => dispatch(fetchApi()),
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart)