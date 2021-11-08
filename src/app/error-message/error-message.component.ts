import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit, OnDestroy {
  $error: Observable<{ errorMessage: string }>;
  errorMessage = '';

  private subscription: Subscription;
  constructor(private store: Store<{ error: { errorMessage: string } }>) {
    this.$error = store.select('error');
  }

  ngOnInit(): void {
    this.subscription = this.$error.subscribe((err) => {
      this.errorMessage = err.errorMessage;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
