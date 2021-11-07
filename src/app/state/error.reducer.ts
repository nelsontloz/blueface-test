import { createReducer, on } from '@ngrx/store';
import {
  profileClearErrorMessage,
  profileSetErrorMessage,
} from './error.actions';

const initialState = {
  errorMessage: '',
};

const _errorReducer = createReducer(
  initialState,
  on(profileSetErrorMessage, (state, { errorMessage }) => ({ errorMessage })),
  on(profileClearErrorMessage, (state) => ({ errorMessage: '' }))
);

export function errorReducer(state: any, action: any) {
  return _errorReducer(state, action);
}
