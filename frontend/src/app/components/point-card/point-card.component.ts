import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-point-card',
  templateUrl: './point-card.component.html',
  styleUrls: ['./point-card.component.scss'],
})
export class PointCardComponent {
  @Input()
  type: 'point' | 'smile' = 'point';
  point: number = 100;
}
