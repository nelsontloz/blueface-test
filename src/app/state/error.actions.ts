import { createAction, props } from '@ngrx/store';

export const profileSetErrorMessage = createAction(
  '[Error Component] Set Error Message',
  props<{ errorMessage: string }>()
);
export const profileClearErrorMessage = createAction(
  '[Error Component] Clear Error Message'
);
