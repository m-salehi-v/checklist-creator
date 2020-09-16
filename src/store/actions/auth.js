import * as actionTypes from './actionTypes';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const authUser = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email,
        password,
        isSignup
    }
}