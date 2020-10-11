import * as actionTypes from './actionTypes';

export const saveUsedChecklistStart = () => {
    return {
        type: actionTypes.SAVE_USED_CHECKLIST_START
    }
}
export const saveUsedChecklistFail = () => {
    return {
        type: actionTypes.SAVE_USED_CHECKLIST_FAIL
    }
}
export const saveUsedChecklistSuccess = (newChecklist) => {
    return {
        type: actionTypes.SAVE_USED_CHECKLIST_SUCCESS,
        newChecklist
    }
}
export const saveUsedChecklist = (token, data) => {
    return {
        type: actionTypes.SAVE_USED_CHECKLIST,
        token,
        data
    }
}


export const fetchUsedChecklistsStart = () => {
    return {
        type: actionTypes.FETCH_USED_CHECKLISTS_START
    }
}

export const fetchUsedChecklistsSuccess = (fetchedData) => {
    return {
        type: actionTypes.FETCH_USED_CHECKLISTS_SUCCESS,
        fetchedData
    }
}
export const fetchUsedChecklistsFail = (error) => {
    return {
        type: actionTypes.FETCH_USED_CHECKLISTS_FAIL,
        error
    }
}
export const fetchUsedChecklists = (token, userId) => {
    return {
        type: actionTypes.FETCH_USED_CHECKLISTS,
        token,
        userId
    }
}