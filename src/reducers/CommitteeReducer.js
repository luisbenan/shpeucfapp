// handle all things related to events
import {
    C_NAME_CHANGED,
    C_DESCRIPTION_CHANGED,
    CREATE_COMMITTEE,
    FETCH_COMMITTEES,
    EDIT_COMMITTEE,
    OWNER_ID_CHANGED,
    OWNER_F_NAME_CHANGED,
    OWNER_L_NAME_CHANGED,
    OWNER_EMAIL_CHANGED,
    C_ID_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    cName: "",
    cDescription: "",
    ownerID: "",
    ownerFName: "",
    ownerLName: "",
    ownerEmail: "",
    cID: "",
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
        case OWNER_ID_CHANGED:
            return {
                ...state,
                ownerID: payload
            };
        case OWNER_F_NAME_CHANGED:
            return {
                ...state,
                ownerFName: payload
            };
        case OWNER_L_NAME_CHANGED:
            return {
                ...state,
                ownerLName: payload
            };
        case OWNER_EMAIL_CHANGED:
            return {
                ...state,
                ownerEmail: payload
            };
        case C_ID_CHANGED:
            return {
                ...state,
                cID: payload
            };
        case FETCH_COMMITTEES:
            return {
                ...state,
                committeeList: payload
            };
        case CREATE_COMMITTEE:
            return {
                ...state,
                cName: "",
                cDescription: ""
            }
        case EDIT_COMMITTEE:
            return {
                ...state,
                cName: "",
                cDescription: ""
            }
        default:
            return state;
    }
};
