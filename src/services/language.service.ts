import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Langueges } from './models/langueges';

@Injectable()
export class LanguageService {

  url = 'http://localhost:54258/api/langueges';

  constructor(private http: HttpClient) {}

  getPLanguages() {
    return this.http.get<Langueges[]>(this.url);
  }
  getLanguagesById(id: number) {
    return this.http.get<Langueges[]>(this.url + '/' + id);
  }
  // getLanguages() {
  //   return this.http.get<Langueges[]>(this.url);
  // }
}
