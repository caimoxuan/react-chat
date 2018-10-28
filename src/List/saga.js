/**
 * This module exports saga
 */
import {put, takeEvery} from 'redux-saga/effects';

import {
  FETCH_SOME_ASYNC_REQUEST,
} from './actionTypes';

import {
  fetchSomeAsyncSucceed,
  fetchSomeAsyncFailure,
} from './actions';

/**
 * @param  {object} options
 * @yield {Action}
 */
export function* mockFetch() {
  try {
    yield new Promise((resolve) => {
      return setTimeout(() => {
        resolve();
      }, 1000);
    });

    // Fire success action
    yield put(fetchSomeAsyncSucceed());
  } catch (err) {
    // Fire failure action
    yield put(fetchSomeAsyncFailure(err));
  }
}

/**
 * Watch api request
 */
export default function* () {
  yield takeEvery(FETCH_SOME_ASYNC_REQUEST, mockFetch);
}
