import { Component } from '@angular/core';
import { Gift } from '../../models/domain/gift';
import { Observable } from 'rxjs';
import { AppSelector } from '../../store/selector/app.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-gift-list-card',
  templateUrl: './gift-list-card.component.html',
  styleUrls: ['./gift-list-card.component.scss'],
})
export class GiftListCardComponent {
  displayedColumns: string[] = ['sender', 'name', 'count', 'point', 'smile'];
  gifts$: Observable<Gift[]> = this.store.select(AppSelector.allGifts);

  constructor(private store: Store) {}
}
