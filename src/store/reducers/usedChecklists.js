import * as actionTypes from '../actions/actionTypes';

const initialState = {
    usedChecklists: [],
    loading: false,
    succeed: false,
    error: null,
    saveUsedChecklistSucceed: false
}

const saveUsedChecklist = (state, action) => {
    return {
        ...state,
        loading: false,
        usedChecklists: state.usedChecklists.concat(action.newChecklist),
        succeed: true,
        saveUsedChecklistSucceed: true
    }
}

const saveUsedChecklists = (state, action) => {
    return {
        ...state,
        loading: false,
        usedChecklists: action.fetchedData,
        succeed: true,
        error: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_CHECKLISTS_START:
        case actionTypes.SAVE_USED_CHECKLIST_START: return { ...state, error: null, succeed: false, loading: true, saveUsedChecklistSucceed: false };
        case actionTypes.FETCH_CHECKLISTS_FAIL:
        case actionTypes.SAVE_USED_CHECKLIST_FAIL: return { ...state, loading: false, succeed: false, error: action.error, saveUsedChecklistSucceed: false }
        case actionTypes.SAVE_USED_CHECKLIST_SUCCESS : return saveUsedChecklist(state, action);
        case actionTypes.FETCH_USED_CHECKLISTS_SUCCESS : return saveUsedChecklists(state, action);

        
        default: return state;
    }
}

export default reducer;