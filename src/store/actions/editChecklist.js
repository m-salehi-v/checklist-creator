import * as actionTypes from './actionTypes';

export const editChecklistStart = () => {
    return {
        type: actionTypes.EDIT_CHECKLIST_START
    }
}
export const editChecklistFail = (error) => {
    return {
        type: actionTypes.EDIT_CHECKLIST_FAIL,
        error
    }
}
export const editChecklistSuccess = () => {
    return {
        type: actionTypes.EDIT_CHECKLIST_SUCCESS,
    }
}
export const editChecklist = (token, data, id) => {
    return {
        type: actionTypes.EDIT_CHECKLIST,
        token,
        data,
        id
    }
}
export const setSucceedToFalse = () => {
    return {
        type: actionTypes.SET_SUCCEED_FALSE
    }
}

