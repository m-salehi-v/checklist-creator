import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* saveChecklist({token, data}) {
    yield put(actions.saveChecklistStart());

    try {
        yield axios.post('https://checklist-creator-732ef.firebaseio.com/checklists.json?auth=' + token, data);
        yield put(actions.saveChecklistSuccess(data));
    } catch (error) {
        yield put(actions.saveChecklistFail(error));
    }
}

export function* fetchChecklists({token, userId}) {
    yield put(actions.fetchChecklistsStart());

    try {
        const url = `https://checklist-creator-732ef.firebaseio.com/checklists.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        const response = yield axios.get(url);
        const fetchedData = [];
        for(let key in response.data){
            fetchedData.push({...response.data[key], id: key});
        }
        yield put(actions.fetchChecklistsSuccess(fetchedData));
    } catch (error) {
        yield put(actions.fetchChecklistsFail(error));
    }
}