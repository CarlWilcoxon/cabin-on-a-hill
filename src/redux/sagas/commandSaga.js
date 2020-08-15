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
      case 'LOGOUT':
        yield put({ type: 'LOGOUT' });
        break;
      case 'TACO':
        yield put({ type: 'OUTPUT', payload : 'BURRITO'});
        break;
      default:
        const response = yield axios.post('/api/command/' + search);
        // filter out the failed actions, unless everything failed
        // if everything failed then only let one response through
        let allFailed = true;
        console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].successful) {
            allFailed = false;
            yield put({ type: 'OUTPUT', payload: response.data[i] })
          }
        }
        if (allFailed) {
          yield put({ type: 'OUTPUT', payload: response.data[0] })
        }
    }
  // refresh room data
  yield put({ type: 'FETCH_ROOM' });

  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* commandSaga() {
  yield takeLatest('COMMAND', checkCommand);
}

export default commandSaga;
