import {
    connect
} from 'react-redux'

// Actions
import {
    fetchApi
} from '@actions/home.action.js';

// Component
import Home from '@components/Home/Home';

const mapStateToProps = state => {
    return {
        cartDetails: state.home
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCartDetails: () => dispatch(fetchApi()),
        modifyCart: (item) =>{
            console.log(item);
        }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)