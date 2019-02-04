import {Injectable} from '@angular/core';

@Injectable()
export class DataService {

  private _data = [
    {
      type: 'text-message',
      author: 'Kostya',
      surname: 'Danovsky',
      header: 'Posted new message',
      text: 'Why did the CoffeeScript developer keep getting lost? Because he couldn\'t find his source without a map',
      time: '18.11.2015',
      ago: '9 days ago',
      expanded: false,
    }
  ];

  getData() {
    return this._data;
  }
}
