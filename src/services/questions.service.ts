

import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Questions } from './models/questions';

@Injectable()
export class QuestionService {

  url = 'http://localhost:54258/api/questions';

  constructor(private http: HttpClient) {}

  getQuestionsByLangId(id: number) {
    return this.http.get<Questions[]>(this.url + '/' + id);
  }
}
