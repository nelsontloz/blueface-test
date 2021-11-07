import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { profileClearErrorMessage } from '../state/error.actions';
import { profileLoad, profileUpdateName } from '../state/profile.actions';
import { IProfileState } from '../state/profile.reducer';

type stateT = 'loading' | 'error' | 'saving' | 'loaded';
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  public title = 'Profile';
  public profileState: IProfileState;
  public $profile: Observable<IProfileState>;

  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ profile: IProfileState }>
  ) {
    this.$profile = store.select('profile');
  }

  ngOnInit(): void {
    this.store.dispatch(profileLoad());
    this.$profile.subscribe((state) => {
      this.profileState = state;
      this.profileForm.reset();
      this.profileForm.controls['firstName'].setValue(state.profile?.firstName);
      this.profileForm.controls['lastName'].setValue(state.profile?.lastName);
    });

    this.profileForm.valueChanges
      .pipe(
        map(() => this.profileForm.pristine),
        filter((pristine) => !pristine)
      )
      .subscribe(() => {
        this.store.dispatch(profileClearErrorMessage());
      });
  }

  ngOnDestroy() {}

  async onSubmit() {
    this.store.dispatch(profileClearErrorMessage());
    const formValue = this.profileForm.getRawValue();
    const firstName = formValue['firstName'];
    const lastName = formValue['lastName'];

    this.store.dispatch(profileUpdateName({ firstName, lastName }));
  }
}
