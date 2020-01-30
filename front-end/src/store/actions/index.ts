import {
  SystemState,
  EventsActionTypes,
  FETCH_ALL_CARE_RECIPIENTS,
  SET_ALL_CARE_RECIPIENTS,
  SET_LOADING,
  SET_CURRENT_RECIPIENT_ID,
  SET_EVENTS,
} from '@App/store/types/types';

export function fetchAllCareRecipients(): EventsActionTypes {
  return {
    type: FETCH_ALL_CARE_RECIPIENTS,
  };
}

export function setAllCareRecipients(data: SystemState['careRecipients']): EventsActionTypes {
  return {
    type: SET_ALL_CARE_RECIPIENTS,
    payload: data,
  };
}

export function setLoading(data: SystemState['loading']): EventsActionTypes {
  return {
    type: SET_LOADING,
    payload: data,
  };
}

export function setCurrentRecipientId(data: SystemState['currentRecipientId']): EventsActionTypes {
  return {
    type: SET_CURRENT_RECIPIENT_ID,
    payload: data,
  };
}

export function setEvents(data: SystemState['events']): EventsActionTypes {
  return {
    type: SET_EVENTS,
    payload: data,
  };
}