// Default state
const defaultState = {
  isApiLoading: true,
  cartData: []
};

const home = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case 'API_REQUEST':
      return {
        ...state,
        isApiLoading: action.isApiLoading
      };

    case 'API_RESPONSE':
      return {
        ...state,
        isApiLoading: action.isApiLoading,
        cartData: action.cartData
      };

    default:
      return state;
  }
};
export default home;