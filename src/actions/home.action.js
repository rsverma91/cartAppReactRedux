import axios from 'axios';


let apiRequest = () => {
    return {
        type: 'API_REQUEST',
        isApiLoading: true
    };
}

let apiResponse = (cartData) => {
    return {
        type: 'API_RESPONSE',
        isApiLoading: false,
        cartData
    };
}
/**
 * @function
 * @desc Fetch api data 
 * @param {Function} callback Callback function
 * @returns none
 */
export const fetchApi = () => {
    return dispatch => {
        dispatch(apiRequest())

        axios
            .get('https://api.myjson.com/bins/qhnfp')
            .then(response => dispatch(apiResponse(response.data)))
            .catch(error => {
                dispatch({
                    type: 'ERROR_RESPONSE',
                    isError: true,
                    message: error.message || "something went wrong"
                })
            });
    };
}