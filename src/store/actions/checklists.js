import * as actionTypes from './actionTypes';

export const saveChecklist = (newChecklist, token) => {
    return {
        type: actionTypes.SAVE_CHECKLIST,
        data: newChecklist,
        token
    }
}

export const saveChecklistStart = () => {
    return {
        type: actionTypes.SAVING_CHECKLIST_START
    }
}

export const saveChecklistSuccess = (newChecklist) => {
    return {
        type: actionTypes.SAVING_CHECKLIST_SUCCESS,
        newChecklist
    }
}

export const saveChecklistFail = (error) => {
    return {
        type: actionTypes.SAVING_CHECKLIST_FAIL,
        error
    }
}

export const fetchChecklistsStart = () => {
    return {
        type: actionTypes.FETCH_CHECKLISTS_START
    }
}

export const fetchChecklistsSuccess = (fetchedData) => {
    return {
        type: actionTypes.FETCH_CHECKLISTS_SUCCESS,
        fetchedData
    }
}
export const fetchChecklistsFail = (error) => {
    return {
        type: actionTypes.FETCH_CHECKLISTS_FAIL,
        error
    }
}
export const fetchChecklists = (token, userId) => {
    return {
        type: actionTypes.FETCH_CHECKLISTS,
        token,
        userId
    }
}

export const getChecklistByIdStart = () => {
    return {
        type: actionTypes.GET_CHECKLIST_BY_ID_START
    }
}
export const getChecklistByIdSuccess = (fetchedChecklist) => {
    return {
        type: actionTypes.GET_CHECKLIST_BY_ID_SUCCESS,
        fetchedChecklist
    }
}
export const getChecklistByIdFail = (error) => {
    return {
        type: actionTypes.GET_CHECKLIST_BY_ID_FAIL,
        error
    }
}
export const getChecklistById = (id, token, path) => {
    return {
        type: actionTypes.GET_CHECKLIST_BY_ID,
        id,
        token,
        path
    }
}


export const setChecklistToUse = (updatedChecklist) => {
    return {
        type: actionTypes.SET_CHECKLIST_TO_USE,
        updatedChecklist
    }
}
