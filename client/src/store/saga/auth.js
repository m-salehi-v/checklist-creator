import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* authUser({userData, isSignup}) {
    yield put(actions.authStart());
    let data = {
        name: userData.name,
        email: userData.email,
        password: userData.password
    };
    let url = '/api/signup';
    if(!isSignup) {
        url = '/api/signin';
    }
    try {
        const response = yield axios.post(url, data);
        console.log(response)
        yield put(actions.authSuccess(isSignup ? response.data.insertId : response.data.id, response.data.userName));
    } catch (error) {
        yield put(actions.authFail(error));
    }
}

export function* logoutSaga() {
    try {
        yield axios.get('/api/logout');
        yield put(actions.logoutSucceed());
    } catch (error) {
        console.log(error);
    }
}

export function* autoLogin() {
    try {
        const response = yield axios.get('/api/autologin');
        yield put(actions.authSuccess(response.data.id, response.data.name));
    } catch (error) {
        console.log(error);
    }
}