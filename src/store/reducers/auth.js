import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    isAuthenticated: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return({...state, loading: true, error: null});
        case actionTypes.AUTH_SUCCESS: return ({...state, isAuthenticated: true, loading: false});
        case actionTypes.AUTH_FAIL: return ({...state, loading: false, error: action.error});
        default: return state;

    }
}

export default reducer;