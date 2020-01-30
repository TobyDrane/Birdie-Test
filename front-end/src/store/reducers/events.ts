import {
  SystemState,
  EventsActionTypes,
  SET_ALL_CARE_RECIPIENTS,
  SET_LOADING,
  SET_CURRENT_RECIPIENT_ID,
  SET_EVENTS,
} from '@App/store/types/types';

const initialState: SystemState = {
  currentRecipientId: undefined,
  careRecipients: [],
  events: [],
  loading: true,
};

export function eventsReducer(
  state: SystemState = initialState,
  action: EventsActionTypes,
): SystemState {
  switch (action.type) {
    case SET_ALL_CARE_RECIPIENTS:
      return {
        ...state,
        careRecipients: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_CURRENT_RECIPIENT_ID:
      return {
        ...state,
        currentRecipientId: action.payload,
      };
    case SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    default:
      return state;
  }
}