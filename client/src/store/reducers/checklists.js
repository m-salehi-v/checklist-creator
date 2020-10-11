import * as actionTypes from '../actions/actionTypes';

const initialState = {
    checklists: [],
    loading: false,
    succeed: false,
    error: null,
    checklistToUse: null
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
const getChecklistById = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        succeed: true,
        checklistToUse: action.fetchedChecklist
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVING_CHECKLIST_START: return { ...state, error: null, succeed: false, loading: true };
        case actionTypes.SAVING_CHECKLIST_SUCCESS: return saveChecklist(state, action);

        case actionTypes.FETCH_CHECKLISTS_FAIL:
        case actionTypes.GET_CHECKLIST_BY_ID_FAIL:
        case actionTypes.SAVING_CHECKLIST_FAIL: return { ...state, loading: false, succeed: false, error: action.error }

        case actionTypes.FETCH_CHECKLISTS_START:
        case actionTypes.GET_CHECKLIST_BY_ID_START: return { ...initialState, loading: true };
        
        case actionTypes.FETCH_CHECKLISTS_SUCCESS: return fetchChecklists(state, action);
        
        case actionTypes.SET_CHECKLIST_TO_USE: return { ...state, checklistToUse: action.updatedChecklist }
        
        case actionTypes.GET_CHECKLIST_BY_ID_SUCCESS: return getChecklistById(state, action);
        default: return state;
    }
}

export default reducer;