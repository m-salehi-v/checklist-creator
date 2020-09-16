import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions';

export function* authUser(action) {
    yield put(actions.authStart());
    const data = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGyrLV6NE92EvgINlQ7Tn25dqZ6PCQWGU';
    if(!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGyrLV6NE92EvgINlQ7Tn25dqZ6PCQWGU'
    }
    try {
        const response = yield axios.post(url, data);

        yield put(actions.authSuccess());
    } catch (error) {
        yield put(actions.authFail(error));
    }
}