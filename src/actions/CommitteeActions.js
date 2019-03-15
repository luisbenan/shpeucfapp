import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import { Alert } from 'react-native'

import {
  C_NAME_CHANGED,
  C_DESCRIPTION_CHANGED,
  OWNER_ID_CHANGED,
  OWNER_F_NAME_CHANGED,
  OWNER_L_NAME_CHANGED,
  OWNER_EMAIL_CHANGED,
  C_ID_CHANGED,
  CREATE_COMMITTEE,
  EDIT_COMMITTEE,
  FETCH_COMMITTEES,
  PAGE_LOAD } from './types';

export const cNameChanged = (text) => {
  return {
    type: C_NAME_CHANGED,
    payload: text
  };
};

export const cDescriptionChanged = (text) => {
  return {
    type: C_DESCRIPTION_CHANGED,
    payload: text
  };
};

export const ownerIDChanged = (text) => {
  return {
    type: OWNER_ID_CHANGED,
    payload: text
  };
};

export const ownerFNameChanged = (text) => {
  return {
    type: OWNER_F_NAME_CHANGED,
    payload: text
  };
};

export const ownerLNameChanged = (text) => {
  return {
    type: OWNER_L_NAME_CHANGED,
    payload: text
  };
};

export const ownerEmailChanged = (text) => {
  return {
    type: OWNER_EMAIL_CHANGED,
    payload: text
  };
};

export const cIDChanged = (text) => {
  return {
    type: C_ID_CHANGED,
    payload: text
  };
};


export const createCommittee = (name, description, ownerID, ownerFName, ownerLName, ownerEmail) => {

  firebase.database().ref(`/committees/`).push({ 
      name: name,
      description: description,
      ownerID: ownerID,
      ownerFName: ownerFName,
      ownerLName: ownerLName,
      ownerEmail: ownerEmail
    })
    .then(() => Alert.alert('Committee created','Successful'))
    .catch((error) => Alert.alert('Committee creation Failed', 'Failure'));

  return (dispatch) => {  
    dispatch({
      type: CREATE_COMMITTEE,
    });
  }
};

export const editCommittee = (name, description, id) => {

  firebase.database().ref(`/committees/${id}`).update({ 
      name: name,
      description: description,
    })
    .then(() => Alert.alert('Committee edited','Successful'))
    .catch((error) => Alert.alert('Committee edit Failed', 'Failure'));

  return (dispatch) => {  
    dispatch({
      type: EDIT_COMMITTEE,
    });
  }
};

export const fetchCommittees = () => {
    return (dispatch) => {
        firebase.database().ref('committees/').on('value', snapshot => {
            dispatch({
                type: FETCH_COMMITTEES,
                payload: snapshot.val(),
            });
            dispatch({
                type: PAGE_LOAD,
                payload: false,
            });
        });
    };
};