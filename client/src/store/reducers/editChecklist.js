import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    succeed: false,
    error: null
}

const editChecklist = (state, action) => {
    return {
        ...state,
        loading: false,
        succeed: true,
        error: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.EDIT_CHECKLIST_START: return { ...state, error: null, succeed: false, loading: true, saveUsedChecklistSucceed: false };
        case actionTypes.EDIT_CHECKLIST_FAIL: return { ...state, loading: false, succeed: false, error: action.error, saveUsedChecklistSucceed: false }
        case actionTypes.EDIT_CHECKLIST_SUCCESS : return editChecklist(state, action);

        case actionTypes.SET_SUCCEED_FALSE: return {...state, succeed: false}
        default: return state;
    }
}

export default reducer;