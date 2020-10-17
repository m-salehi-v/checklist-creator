import * as actionTypes from './actionTypes';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (userId, userName) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId,
        userName
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const authUser = (userData, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        userData,
        isSignup
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_SAGA
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const autoLogin = () => {
    return {
        type: actionTypes.AUTO_LOGIN
    }
}

export const checkTimeout = (expirationTime) => {
    return {
        type: actionTypes.CHECK_TIMEOUT,
        expirationTime
    }
}