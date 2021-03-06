import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchRoom() {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/room');
    console.log('fetchRoom response.data:', response.data);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
     if (response.data.length === 0 ) {
       yield put({ type: 'NEW_ROOM' })
     } else {
      yield put({ type: 'SET_ROOM', payload: response.data });
     }

  } catch (error) {
    console.log('User get request failed', error);
  }
}
function* createRoom() {
  try {
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    yield axios.post('/api/room');

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'FETCH_ROOM' });
  } catch (error) {
    console.log('User post request failed', error);
  }
}
function* roomSaga() {
  yield takeLatest('FETCH_ROOM', fetchRoom);
  yield takeLatest('NEW_ROOM', createRoom)
}

export default roomSaga;
