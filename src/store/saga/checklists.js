import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* saveChecklist(action) {
    yield put(actions.saveChecklistStart());

    try {
        yield axios.post('https://checklist-creator-732ef.firebaseio.com/checklists.json?auth=' + action.token, action.data);
        yield put(actions.saveChecklistSuccess(action.data));
    } catch (error) {
        yield put(actions.saveChecklistFail(error));
    }
}