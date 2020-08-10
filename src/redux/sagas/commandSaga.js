import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on the "COMMAND" action
function* checkCommand(action) {
  try {
    let search = '';
    if (action.payload !== undefined) {
      for (let i = 0; i < action.payload.length; i++) {
        search = search + action.payload[i];
        // if it is not the last word, add a space at the end
        if (i !== action.payload.length - 1) {
          search = search + ' ';
        }
      }
    }

    if (search === 'LOOK') {
      yield put({type:'LOOK'})
    } else{
      const response = yield axios.post('/api/command/' + search);

      yield put({ type: 'OUTPUT', payload: response.data });
    }

  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* commandSaga() {
  yield takeLatest('COMMAND', checkCommand);
}

export default commandSaga;
