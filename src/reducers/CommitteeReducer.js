// handle all things related to events
import {
    C_NAME_CHANGED,
    C_DESCRIPTION_CHANGED,
    CREATE_COMMITTEE,
    FETCH_COMMITTEES
} from '../actions/types';

const INITIAL_STATE = {
    cName: "",
    cDescription: "",
    committeeList: {}
};

export default (state = INITIAL_STATE, action) => {
    const {
        payload
    } = action;

    switch (action.type) {
        case C_NAME_CHANGED:
            return {
                ...state,
                cName: payload
            };
        case C_DESCRIPTION_CHANGED:
            return {
                ...state,
                cDescription: payload
            };
        case FETCH_COMMITTEES:
            return {
                ...state,
                committeeList: payload
            };
        case CREATE_COMMITTEE:
            return state
        default:
            return state;
    }
};
