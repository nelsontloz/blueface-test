import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { profileReducer } from './state/profile.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './state/profile.effects';
import { errorReducer } from './state/error.reducer';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [AppComponent, ProfileSettingsComponent, ErrorMessageComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ profile: profileReducer, error: errorReducer }, {}),
    ReactiveFormsModule,
    EffectsModule.forRoot([ProfileEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
