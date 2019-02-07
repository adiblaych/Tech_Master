import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Langueges } from './models/langueges';
import { Subject } from 'rxjs';

@Injectable()
export class LanguageService {
  onLanguegeSelected: Subject<string> = new Subject<string>();
  url = 'http://localhost:54258/api/langueges';

  constructor(private http: HttpClient) {}

  getPLanguages() {
    return this.http.get<Langueges[]>(this.url);
  }
  getLanguagesById(id: number) {
    return this.http.get<Langueges[]>(this.url + '/' + id);
  }
  updateNum(primaryID: number) {
    return this.http.post(this.url, primaryID);
  }
}
}
