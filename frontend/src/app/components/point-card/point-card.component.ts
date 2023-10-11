import { Component, Input } from '@angular/core';
import { AppSelector } from '../../store/selector/app.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-point-card',
  templateUrl: './point-card.component.html',
  styleUrls: ['./point-card.component.scss'],
})
export class PointCardComponent {
  get type(): 'point' | 'smile' {
    return this._type;
  }

  @Input()
  set type(value: 'point' | 'smile') {
    this._type = value;
    if (value === 'point') {
      this.point$ = this.store.select(AppSelector.pointSummary);
    } else if (value === 'smile') {
      this.point$ = this.store.select(AppSelector.smileSummary);
    }
  }

  private _type: 'point' | 'smile' = 'point';

  point$?: Observable<number>;

  constructor(private store: Store) {}
}
