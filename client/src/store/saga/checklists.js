import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* saveChecklist({token, data}) {
    yield put(actions.saveChecklistStart());

    try {
        const dataToSend = {...data, date: new Date()}
        yield axios.post('https://checklist-creator-732ef.firebaseio.com/checklists.json?auth=' + token, dataToSend);
        yield put(actions.saveChecklistSuccess(dataToSend));
    } catch (error) {
        yield put(actions.saveChecklistFail(error));
    }
}

export function* fetchChecklists({token, userId}) {
    yield put(actions.fetchChecklistsStart());

    try {
        // const url = `https://checklist-creator-732ef.firebaseio.com/checklists.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        const url = `/api/checklists/${userId}`;
        const response = yield axios.get(url);
        const fetchedData = [];
        for(let key in response.data){
            fetchedData.push({...response.data[key], id: key});
        }
        fetchedData.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        yield put(actions.fetchChecklistsSuccess(fetchedData));
    } catch (error) {
        yield put(actions.fetchChecklistsFail(error));
    }
}

export function* fetchUsedChecklists({token, userId}) {
    yield put(actions.fetchUsedChecklistsStart());

    try {
        const url = `https://checklist-creator-732ef.firebaseio.com/used-checklists.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        const response = yield axios.get(url);
        const fetchedData = [];
        for(let key in response.data){
            fetchedData.push({...response.data[key], id: key});
        }
        fetchedData.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        yield put(actions.fetchUsedChecklistsSuccess(fetchedData));
    } catch (error) {
        yield put(actions.fetchUsedChecklistsFail(error));
    }
}

export function* getChecklistById({id, token, path}) {
    yield put(actions.getChecklistByIdStart());

    try {
        const response = yield axios.get(`https://checklist-creator-732ef.firebaseio.com/${path}/${id}.json?auth=${token}`);
        yield put(actions.getChecklistByIdSuccess(response.data));
    } catch (error) {
        yield put(actions.getChecklistByIdFail(error));
    }
}

export function* saveUsedChecklist({token, data}) {
    yield put(actions.saveUsedChecklistStart());

    try {
        const dataToSend = {...data, date: new Date()}
        yield axios.post('https://checklist-creator-732ef.firebaseio.com/used-checklists.json?auth=' + token, dataToSend);
        yield put(actions.saveUsedChecklistSuccess(dataToSend));
    } catch (error) {
        yield put(actions.saveUsedChecklistFail(error));
    }
}

export function* editChecklist({data, token, id}) {
    yield put(actions.editChecklistStart());

    try {
        yield axios.patch(`https://checklist-creator-732ef.firebaseio.com/checklists/${id}.json?auth=${token}`, data);
        yield put(actions.editChecklistSuccess());
    } catch (error) {
        yield put(actions.editChecklistFail(error));
    }
}