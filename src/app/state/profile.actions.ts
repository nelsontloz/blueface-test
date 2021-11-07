import { createAction, props } from '@ngrx/store';
import { IProfile } from '../profile.service';

export const profileLoad = createAction('[Profile Component] Load Profile');

export const profileLoadedSuccess = createAction(
  '[Profile Component] Profile Loaded Success',
  props<IProfile>()
);

export const profileUpdateName = createAction(
  '[Profile Component] Update Name',
  props<{ firstName: string; lastName: string }>()
);

export const profileUpdateUnsuccess = createAction(
  '[Profile Component] UpdateUnsuccess'
);
