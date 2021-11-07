import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  retryWhen,
  tap,
  concatMap,
} from 'rxjs/operators';
import { ProfileService } from '../profile.service';
import { profileSetErrorMessage } from './error.actions';
import {
  profileLoad,
  profileLoadedSuccess,
  profileUpdateName,
  profileUpdateUnsuccess,
} from './profile.actions';

@Injectable()
export class ProfileEffects {
  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(profileLoad),
      mergeMap(() =>
        defer(() => this.profileService.getProfileUser()).pipe(
          retryWhen((errors) => {
            return errors.pipe(tap(console.log));
          }),
          map((profile) => {
            return profileLoadedSuccess(profile);
          })
        )
      )
    )
  );

  updateProfileName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileUpdateName),
      mergeMap(({ firstName, lastName }) => {
        return defer(() =>
          this.profileService.setName(firstName, lastName)
        ).pipe(
          concatMap((profile) => {
            return defer(() =>
              this.profileService.setEmail(
                this.deriveEmail(firstName, lastName)
              )
            );
          }),
          map((profile) => {
            return profileLoadedSuccess(profile);
          }),
          catchError(({ error }) => {
            return of(profileSetErrorMessage({ errorMessage: error }));
          })
        );
      })
    );
  });

  updateErrorMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileSetErrorMessage),
      map(() => {
        return profileUpdateUnsuccess();
      })
    );
  });

  private deriveEmail(firstName: string, lastName: string) {
    return `${firstName.replace(/\s/g, '').toLowerCase()}.${lastName
      .replace(/\s/g, '')
      .toLowerCase()}@blueface.com`;
  }

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}
}
