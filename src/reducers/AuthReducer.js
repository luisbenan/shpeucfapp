// handle all things related to authentication
import {
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  EMAIL_CHANGED,
  MAJOR_CHANGED,
  COLLEGE_CHANGED,
  POINTS_CHANGED,
  PRIVILEGE_CHANGED,
  PICTURE_CHANGED,
  PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  REGISTRATION_ERROR,
  SHOW_FIREBASE_ERROR,
  VERIFIED_USER,
  LOGIN_USER,
  ENTER_APP,
  LOAD_USER,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  EDIT_USER,
  CONTINENT_CHANGED,
  NATIONALITY_CHANGED,
  GENDER_CHANGED,
  BIRTH_DATE_CHANGED,
  GO_TO_RESET_PASSWORD,
  GO_TO_LOGIN,
  GO_TO_PROFILE,
  GO_TO_REGISTRATION,
  GO_TO_EDIT_PROFILE_FORM,
  QUOTE_CHANGED,
  GET_PRIVILEGE } from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  college: 'Do not wish to disclose',
  major: 'Do not wish to disclose',
  quote: '',
  paidMember: false,
  // Using URL below to avoid RN warning of empty source.uri as there's a delay fetching.
  // Will improve fetching later, just need to get rid of the warning for now.
  picture: 'https://cdn0.iconfinder.com/data/icons/superuser-web-kit/512/686909-user_people_man_human_head_person-512.png',
  points: 0,
  privilege: {},
  password: '',
  confirmPassword: '',
  continent: 'Do not wish to disclose',
  nationality: 'Do not wish to disclose',
  gender: 'Do not wish to disclose',
  birthday: '0000-00-00',
  user: null,
  loggedIn: null,
  loading: false,
  error: '',
  id: '',
  voted: false,
  applied: false,
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case FIRST_NAME_CHANGED:
      return { ...state,
        firstName: payload
      };
    case LAST_NAME_CHANGED:
      return { ...state,
        lastName: payload
      };
    case EMAIL_CHANGED:
      return { ...state,
        email: payload
      };
    case COLLEGE_CHANGED:
      return { ...state,
        college: payload
      };
    case MAJOR_CHANGED:
      return { ...state,
        major: payload
      };
    case PASSWORD_CHANGED:
      return { ...state,
        password: payload
      };
    case POINTS_CHANGED:
      return { ...state,
        points: payload
      };
    case PRIVILEGE_CHANGED:
      return { ...state,
        privilege: payload
      };
    case PICTURE_CHANGED:
      return { ...state,
        picture: payload
      };
    case CONFIRM_PASSWORD_CHANGED:
      return { ...state,
        confirmPassword: payload
      };
    case QUOTE_CHANGED:
      return { ...state,
        quote: payload
     };
     case CONTINENT_CHANGED:
      return { ...state,
        continent: payload
      };
     case NATIONALITY_CHANGED:
      return { ...state,
        nationality: payload
      };
     case GENDER_CHANGED:
      return { ...state,
        gender: payload
      };
      case BIRTH_DATE_CHANGED:
      return { ...state,
        birthday: payload
      };
    case REGISTRATION_ERROR:
      return { ...state,
        error: payload,
      };
      case SHOW_FIREBASE_ERROR:
        return { ...state,
          error: payload,
        };
    case CREATE_USER:
      return { ...state,
        loading: true,
        error: ''
      };
    case CREATE_USER_SUCCESS:
      return { ...state,
        ... INITIAL_STATE,
      };
    case CREATE_USER_FAIL:
      return { ...state,
        error: payload,
        loading: false,
      };

    case EDIT_USER:
      return {...state,
        firstName: payload
      };

    case GET_PRIVILEGE:
      return { ...state,
        privilege: payload
      };
    case LOGIN_USER:
      return { ...state,
        loading: true,
        error: ''
      };
    case ENTER_APP:
      return { ...state,
        ...INITIAL_STATE,
        user: payload,
        loggedIn: true,
      };
    case LOAD_USER:
      return { ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        college: payload.college,
        email: payload.email,
        major: payload.major,
        quote: payload.quote,
        paidMember: payload.paidMember,
        continent: payload.continent,
        nationality: payload.nationality,
        gender: payload.gender,
        birthday: payload.birthday,
        points: payload.points,
        picture: payload.picture,
        voted: payload.voted,
        applied: payload.applied,
        id: payload.id,
        loading: false
      };
    case LOGIN_USER_FAIL:
      return { ...state,
        error: payload,
        loading: false,
        password: ''
      };
      case LOGOUT_USER:
        return { ...state,
          ...INITIAL_STATE,
        };
    case GO_TO_RESET_PASSWORD:
      return INITIAL_STATE;
    case GO_TO_LOGIN:
      return INITIAL_STATE;
    case GO_TO_PROFILE:
      return state;
    case GO_TO_REGISTRATION:
      return INITIAL_STATE;
    case GO_TO_EDIT_PROFILE_FORM:
      return state;
    default:
      return state;
  }
}
