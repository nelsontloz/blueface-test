import { createReducer, on } from '@ngrx/store';
import { IProfile } from '../profile.service';
import {
  profileLoad,
  profileUpdateName,
  profileLoadedSuccess,
  profileUpdateUnsuccess,
} from './profile.actions';

export interface IProfileState {
  profile?: IProfile;
  status: 'loading' | 'saving' | 'loaded';
}

export const initialState: IProfileState = {
  status: 'loading',
};

const _profileReducer = createReducer(
  initialState,
  on(profileLoad, (state) => ({ ...state, status: 'loading' })),
  on(profileUpdateName, (state) => ({ ...state, status: 'saving' })),
  on(profileLoadedSuccess, (state, profile) => {
    return {
      ...state,
      status: 'loaded',
      profile,
    };
  }),
  on(profileUpdateUnsuccess, (state) => ({ ...state, status: 'loaded' }))
);

export function profileReducer(state: any, action: any) {
  return _profileReducer(state, action);
}
