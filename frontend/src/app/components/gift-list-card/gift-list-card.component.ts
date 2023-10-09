import { Component } from '@angular/core';
import { Gift } from '../../models/domain/gift';

@Component({
  selector: 'app-gift-list-card',
  templateUrl: './gift-list-card.component.html',
  styleUrls: ['./gift-list-card.component.scss'],
})
export class GiftListCardComponent {
  displayedColumns: string[] = ['sender', 'name', 'count', 'point', 'smile'];
  dataSource: Gift[] = [
    {
      sender: 'Marssssssssssssy',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      icon: 'https://inn2sst02.blob.core.windows.net/inn/gifting/icon_image/60c6cc94-f83c-4068-8432-11070a000010.png',
      id: '1',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'point',
      point: 10,
      id: '2',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 3,
      type: 'smile',
      point: 10,
      id: '3',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 10,
      type: 'smile',
      point: 10,
      id: '4',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '5',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '6',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '7',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '8',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '9',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '10',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '11',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '12',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '13',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '14',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '15',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '16',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '17',
    },
    {
      sender: 'Mary',
      name: 'Shelley',
      count: 1,
      type: 'smile',
      point: 10,
      id: '18',
    },
  ];
}