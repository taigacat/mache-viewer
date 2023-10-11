import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Broadcaster } from '../../models/domain/broadcaster';
import { combineLatest, map, Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Store } from '@ngrx/store';
import { AppAction } from '../../store/action/app.action';
import { AppSelector } from '../../store/selector/app.selector';

@Component({
  selector: 'app-broadcaster-selector',
  templateUrl: './broadcaster-selector.component.html',
  styleUrls: ['./broadcaster-selector.component.scss'],
})
export class BroadcasterSelectorComponent implements OnInit {
  broadcasters$: Observable<Broadcaster[]> = this.store.select(
    AppSelector.allBroadcasters
  );

  form?: FormGroup;
  filteredOptions$?: Observable<Broadcaster[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.form = new FormGroup({
      broadcaster: new FormControl(),
    });

    this.store.dispatch(AppAction.retrieveBroadcasters({ more: false }));

    this.filteredOptions$ = combineLatest(
      this.broadcasters$,
      this.form.get('broadcaster')!.valueChanges
    ).pipe(
      map(([broadcasters, value]) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? broadcasters.filter((b) =>
              b.name.toLowerCase().includes(name.toLowerCase())
            )
          : broadcasters;
      })
    );
  }

  onSelect(e: MatAutocompleteSelectedEvent) {
    const selected = e.option.value as Broadcaster;
    this.store.dispatch(AppAction.selectBroadcaster({ broadcaster: selected }));
  }

  displayFn(user: Broadcaster): string {
    return user && user.name ? user.name : '';
  }
}
