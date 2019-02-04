

import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answers } from './models/answers';

@Injectable()
export class AnswersService {

  url = 'http://localhost:54258/api/answers';

  constructor(private http: HttpClient) {}

  getAnswersByQuestionId(id: number) {
    return this.http.get<Answers[]>(this.url + '/' + id);
  }
}
