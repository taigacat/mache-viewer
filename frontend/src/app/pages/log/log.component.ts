import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppAction } from '../../store/action/app.action';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      AppAction.retrieveBroadcasters({
        more: false,
      })
    );
  }
}
