import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import { Alert } from 'react-native'

import {
  C_NAME_CHANGED,
  C_DESCRIPTION_CHANGED,
  CREATE_COMMITTEE,
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


export const createCommittee = (name, description, CommitteeOwnerID, CommitteeOwnerFName, CommitteeOwnerLName) => {

  firebase.database().ref('/committees/').push({ 
      name: name,
      description: description,
      CommitteeOwnerID: CommitteeOwnerID,
      CommitteeOwnerFName: CommitteeOwnerFName,
      CommitteeOwnerLName: CommitteeOwnerLName
    })
    .then(() => Alert.alert('Committee created','Successful'))
    .catch((error) => Alert.alert('Committee creation Failed', 'Failure'));

  return (dispatch) => {  
    dispatch({
      type: CREATE_COMMITTEE,
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
        });
    };
};