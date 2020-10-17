import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    isAuthenticated: false,
    userId: null,
    userName: "User",
    error: null
}

const authSuccess = (state, action) => {
    return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userId: action.userId, 
        userName: action.userName
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return({...state, loading: true, error: null});
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return ({...state, loading: false, error: action.error});
        case  actionTypes.AUTH_LOGOUT: return({...state, loading: false, isAuthenticated: false, userId: null, userName: "user"})
        default: return state;
    }
}

export default reducer;