import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stream } from '../../models/domain/stream';

@Component({
  selector: 'app-stream-list-card',
  templateUrl: './stream-list-card.component.html',
  styleUrls: ['./stream-list-card.component.scss'],
})
export class StreamListCardComponent implements OnInit {
  @Input()
  streams: Stream[] = [];

  @Output()
  selectStream: EventEmitter<Stream> = new EventEmitter<Stream>();

  constructor() {}

  ngOnInit(): void {
    console.log(this.streams);
  }
}
