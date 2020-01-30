import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { fetchData } from '@App/store/api';
import {
  FETCH_ALL_CARE_RECIPIENTS,
  SET_CURRENT_RECIPIENT_ID,
} from '@App/store/types/types';
import {
  setAllCareRecipients,
  setLoading,
  setEvents,
} from '@App/store/actions/index';

const getCurrentRecipientId = (state:
  { events: { currentRecipientId: string | undefined;
  }; }) => state.events.currentRecipientId;

// Worker Saga: fires on FETCH_ALL_CARE_RECIPIENTS action
function* fetchAllCareRecipients() {
  try {
    const data = yield call(fetchData, 'all/care_recipient');
    // push data back to the store
    yield put(setAllCareRecipients(data));
    yield put(setLoading(false));
  } catch (e) {
      /* tslint:disable:no-console */
    console.error(e);
  }
}

// Worker Saga: fires on SET_CURRENT_RECIPIENTS_ID action
// we habe changed what recipient want to view so need to load all their events
function* fetchRecipientsEvents() {
  try {
    const currentId = yield select(getCurrentRecipientId);
    yield put(setLoading(true));
    const data = yield call(fetchData, `/care_recipient?id=${currentId}`);
    yield put(setLoading(false));
    yield put(setEvents(data));
  } catch (e) {
    /* tslint::disable:no-console */
    console.error(e);
  }
}

// NOTE: Also cancels any pending sagas
function* initSaga() {
  yield all([
    takeLatest(FETCH_ALL_CARE_RECIPIENTS, fetchAllCareRecipients),
    takeLatest(SET_CURRENT_RECIPIENT_ID, fetchRecipientsEvents),
  ]);
}

export default initSaga;