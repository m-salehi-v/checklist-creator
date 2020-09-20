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

const fetchChecklists = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        succeed: true,
        checklists: action.fetchedData
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVING_CHECKLIST_START: return { ...state,error: null, succeed: false, loading: true };
        case actionTypes.SAVING_CHECKLIST_SUCCESS: return saveChecklist(state, action);
        case actionTypes.SAVING_CHECKLIST_FAIL: return { ...state, loading: false, succeed: false, error: action.error }

        case actionTypes.FETCH_CHECKLISTS_START: return { ...initialState, loading: true };
        case actionTypes.FETCH_CHECKLISTS_SUCCESS: return fetchChecklists(state, action);
        case actionTypes.FETCH_CHECKLISTS_FAIL: return { ...initialState, loading: false, error: action.error };

        default: return state;
    }
}

export default reducer;