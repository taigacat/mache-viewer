import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

export interface User {
  id: string;
  name: string;
}

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {
  form?: FormGroup;
  options: User[] = [
    { name: '宮川みやび', id: '1hd' },
    { name: 'Shelley', id: 'a' },
    { name: 'Igor', id: 'b' },
  ];
  filteredOptions: Observable<User[]> | undefined;

  ngOnInit() {
    this.form = new FormGroup({
      broadcaster: new FormControl(),
    });
    this.filteredOptions = this.form.get('broadcaster')?.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
