import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* quickLook(action) {
  try {


    // passes the username and password from the payload to the server
    const response= yield axios.get('/api/command/LOOK');
    yield put({ type: 'OUTPUT' , payload:response.data.rows[0].description  })

  } catch (error) {
      console.log('Error looking:', error);
      yield put({type: ''});
  }
}

function* quickLookSaga() {
  yield takeLatest('LOOK', quickLook);
}

export default quickLookSaga;
