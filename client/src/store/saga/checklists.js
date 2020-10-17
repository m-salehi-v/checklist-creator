import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions';

export function* saveChecklist({data}) {
    yield put(actions.saveChecklistStart());

    try {
        const dataToSend = {...data, date: new Date()}
        yield axios.post('/api/checklists/insert', dataToSend);
        yield put(actions.saveChecklistSuccess(data));
    } catch (error) {
        yield put(actions.saveChecklistFail(error));
    }
}

export function* fetchChecklists({userId}) {
    yield put(actions.fetchChecklistsStart());

    try {
        const url = `/api/checklists/${userId}`;
        const response = yield axios.get(url);
        const fetchedData = [];
        for(let key in response.data){
            fetchedData.push({...response.data[key]});
        }
        fetchedData.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        yield put(actions.fetchChecklistsSuccess(fetchedData));
    } catch (error) {
        yield put(actions.fetchChecklistsFail(error));
    }
}

export function* fetchUsedChecklists({userId}) {
    yield put(actions.fetchUsedChecklistsStart());

    try {
        const url = `/api/usedChecklists/${userId}`;
        const response = yield axios.get(url);
        const fetchedData = [];
        for(let key in response.data){
            fetchedData.push({...response.data[key]});
        }
        fetchedData.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        yield put(actions.fetchUsedChecklistsSuccess(fetchedData));
    } catch (error) {
        yield put(actions.fetchUsedChecklistsFail(error));
    }
}

export function* getChecklistById({id, path}) {
    yield put(actions.getChecklistByIdStart());

    try {
        const response = yield axios.get(`/api/usechecklists/${path}/${id}`);
        yield put(actions.getChecklistByIdSuccess(response.data));
    } catch (error) {
        yield put(actions.getChecklistByIdFail(error));
    }
}

export function* saveUsedChecklist({data}) {
    yield put(actions.saveUsedChecklistStart());

    try {
        const dataToSend = {...data, date: new Date()}
        yield axios.post('/api/usedChecklists/insert' , dataToSend);
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