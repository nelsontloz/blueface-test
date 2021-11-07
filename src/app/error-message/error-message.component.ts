import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  $error: Observable<{ errorMessage: string }>;
  errorMessage = '';
  constructor(private store: Store<{ error: { errorMessage: string } }>) {
    this.$error = store.select('error');
  }

  ngOnInit(): void {
    this.$error.subscribe((err) => {
      this.errorMessage = err.errorMessage;
    });
  }
}
