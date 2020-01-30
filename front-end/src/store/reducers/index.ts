import { combineReducers } from 'redux';
import { eventsReducer } from '@App/store/reducers/events';

export type RootState = Readonly<{}>;

export const rootReducer = combineReducers<RootState>({
  events: eventsReducer,
});