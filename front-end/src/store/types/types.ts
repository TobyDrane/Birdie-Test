export interface SystemState {
  currentRecipientId: string | undefined;
  careRecipients: Array<Object>;
  /* tslint:disable:no-any */
  events: Array<any>;
  loading: boolean;
}

export const FETCH_ALL_CARE_RECIPIENTS = 'FETCH_ALL_CARE_RECIPIENTS';
export const SET_ALL_CARE_RECIPIENTS = 'SET_ALL_CARE_RECIPIENTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_CURRENT_RECIPIENT_ID = 'SET_CURRENT_RECIPIENT_ID';
export const SET_EVENTS = 'SET_EVENTS';

interface FetchCareRecipients {
  type: typeof FETCH_ALL_CARE_RECIPIENTS;
}

interface SetCareRecipients {
  type: typeof SET_ALL_CARE_RECIPIENTS;
  payload: SystemState['careRecipients'];
}

interface SetLoading {
  type: typeof SET_LOADING;
  payload: SystemState['loading'];
}

interface SetCurrectRecipientId {
  type: typeof SET_CURRENT_RECIPIENT_ID;
  payload: SystemState['currentRecipientId'];
}

interface SetEvents {
  type: typeof SET_EVENTS;
  payload: SystemState['events'];
}

export type EventsActionTypes = FetchCareRecipients |
SetCareRecipients | SetLoading | SetCurrectRecipientId | SetEvents;
