import * as actionTypes from '../actions/actionTypes';

const initialState = {
    checklists: [],
    loading: false,
    succeed: false,
    error: null
}

const saveChecklist = (state, action) => {
    return {
        ...state,
        loading: false,
        checklists: state.checklists.concat(action.newChecklist),
        succeed: true
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVING_CHECKLIST_START: return { ...state, loading: true };
        case actionTypes.SAVING_CHECKLIST_SUCCESS: return saveChecklist(state, action);
        case actionTypes.SAVING_CHECKLIST_FAIL: return {...state, loading: false, succeed: false, error: action.error}
        default: return state;
    }
}

export default reducer;