import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { authUser, autoLogin, checkTimeout, logoutSaga } from './auth';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_USER, authUser);
    yield takeEvery(actionTypes.AUTH_LOGOUT_SAGA, logoutSaga);
    yield takeEvery(actionTypes.AUTO_LOGIN, autoLogin);
    yield takeEvery(actionTypes.CHECK_TIMEOUT, checkTimeout);
}