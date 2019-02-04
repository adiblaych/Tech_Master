import {Injectable} from '@angular/core';

@Injectable()
export class SubjectService {

  private _subjects = [
    {
      id: 1,
      name: 'אנגולר',
      category: 'angular.js',
      logo: 'angular'
    }, {
      id: 2,
      name: 'אנגולר',
      category: 'angular 2',
      logo: 'angular'
    }, {
      id: 3,
      name: 'אנגולר',
      category: 'angular 5',
      logo: 'angular'
    }, {
      id: 4,
      name: 'JAVA',
      category: 'j2ee',
      logo: 'JAVA',
    }
  ];

  public _defaultSubject = {
      id: 0
    }

  getSubjectList() {
    return this._subjects;
  }
  getSubject(id = 1): object {
    this._subjects.forEach(function (x) {
      if ( x.id === id) {
        return  x;
      }
    });
    return {
      id: 4,
      name: 'JAVA',
      category: 'j2ee',
      logo: 'JAVA',
    };
  }
}
