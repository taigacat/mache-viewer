import { Component } from '@angular/core';
import { Stream } from '../../models/domain/stream';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppSelector } from '../../store/selector/app.selector';
import { AppAction } from '../../store/action/app.action';

@Component({
  selector: 'app-stream-list-card',
  templateUrl: './stream-list-card.component.html',
  styleUrls: ['./stream-list-card.component.scss'],
})
export class StreamListCardComponent {
  streams$: Observable<Stream[]> = this.store.select(AppSelector.allStreams);

  constructor(private store: Store) {}

  selectStream(stream: Stream) {
    this.store.dispatch(AppAction.selectStream({ stream }));
  }
}
