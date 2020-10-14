import { delay, put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* authUser({userData, isSignup}) {
    yield put(actions.authStart());
    const data = {
        name: userData.name,
        email: userData.email,
        password: userData.password
    };
    let url = '/api/signup';
    if(!isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGyrLV6NE92EvgINlQ7Tn25dqZ6PCQWGU'
    }
    try {
        const response = yield axios.post(url, data);
        // yield localStorage.setItem('user-id', response.data.localId);
        // yield localStorage.setItem('token' , response.data.idToken);
        // const exDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        // yield localStorage.setItem('expiration-date', exDate);
        yield put(actions.authSuccess(response.data.insertId));
        // yield put(actions.checkTimeout(parseInt(response.data.expiresIn) * 1000));
    } catch (error) {
        yield put(actions.authFail(error));
    }
}

export function* logoutSaga() {
    yield localStorage.removeItem('user-id');
    yield localStorage.removeItem('expiration-date');
    yield localStorage.removeItem('token');
    yield put(actions.logoutSucceed());
}

export function* autoLogin() {
    const userId = yield localStorage.getItem('user-id');
    if(userId) {
        const exDate = yield new Date(localStorage.getItem('expiration-date'));
        const remainTime = exDate.getTime() - new Date().getTime();
        if(remainTime > 0) {
            const token = yield localStorage.getItem('token');
            yield put(actions.authSuccess(userId, token));
            yield put(actions.checkTimeout(remainTime));
        } else {
            yield put(actions.logout());
        }
    } else {
        yield put(actions.logout())
    }
}

export function* checkTimeout(action) {
    yield delay(action.expirationTime);
    yield put(actions.logout());
}