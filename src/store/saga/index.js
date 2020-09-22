import { takeEvery, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { authUser, autoLogin, checkTimeout, logoutSaga } from './auth';
import { editChecklist, fetchChecklists, fetchUsedChecklists, getChecklistById, saveChecklist, saveUsedChecklist } from './checklists';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_USER, authUser);
    yield takeEvery(actionTypes.AUTH_LOGOUT_SAGA, logoutSaga);
    yield takeEvery(actionTypes.AUTO_LOGIN, autoLogin);
    yield takeEvery(actionTypes.CHECK_TIMEOUT, checkTimeout);
}

export function* watchChecklists() {
    yield takeLatest(actionTypes.SAVE_CHECKLIST, saveChecklist);
    yield takeEvery(actionTypes.FETCH_CHECKLISTS, fetchChecklists);
    yield takeLatest(actionTypes.GET_CHECKLIST_BY_ID, getChecklistById);
    yield takeLatest(actionTypes.SAVE_USED_CHECKLIST, saveUsedChecklist);
    yield takeEvery(actionTypes.FETCH_USED_CHECKLISTS, fetchUsedChecklists);
    yield takeEvery(actionTypes.EDIT_CHECKLIST, editChecklist);
}