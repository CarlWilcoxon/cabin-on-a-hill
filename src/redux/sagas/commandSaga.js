import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on the "COMMAND" action
function* checkCommand(action) {
  try {

    // set search to an empty string if there is nothing in action.payload
    // or create a string with the words
    let search = (action.payload !== undefined) ? action.payload.join(' ') : '';

    switch(search) {
      case 'CLEAR':
        yield put({type: 'CLEAR'});
        break;
      case 'TACO':
        yield put({ type: 'OUTPUT', payload : 'BURRITO'});
        break;
      default:
        const response = yield axios.post('/api/command/' + search);
        switch(response.data.dope){

          default:
            yield put({ type: 'OUTPUT', payload: response.data });
        }
    }

  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* commandSaga() {
  yield takeLatest('COMMAND', checkCommand);
}

export default commandSaga;
