import firebase from './firebase.js';
export const GET_DATA = 'GET_DATA';
export const SET_DATA = 'SET_DATA';

export function dataSaved(data = {}) {
  return {
    type: SET_DATA,
    data
  };
}

export function getData(items = {}) {
  return {
    type: GET_DATA,
    items
  };
}

export function saveData(data) {
  return async function thunk(dispatch) {
    firebase.push(data, function(error) {
      if (error) { console.log(`Error: ${error}`)} else { dispatch(dataSaved(data)) }
    });
  }
}

export function fetchData(limit = 0) {
  return function thunk(dispatch) {
    return firebase.on("value").then((snapshot) => {
      dispatch(getData(snapshot.val()))
    }, (err) => {
      console.error('Firebase!', err);
    })

  }
}

export function remove(key) {
  return async function thunk(dispatch) {
    firebase.child(key).remove().then((data) => {
      dispatch(null);
      console.log(data)
    }, (err) => {
      console.error('Firebase!', err);
    });
  }
}

export function update(key, data) {
  console.log(key, data, '000')
  return async function thunk(dispatch) {
    firebase.child(key).update(data).then((data) => {
      dispatch(dataSaved(data));
      console.log(data)
    }, (err) => {
      console.error('Firebase!', err);
    });
  }
}
