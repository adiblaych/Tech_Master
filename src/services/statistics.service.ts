import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { LanguagesStatistics } from './models/languagesStatistics';
import { TestComponent } from '../app/test/test.component';
import { Langueges } from './models/langueges';
@Injectable()
export class StatisticsService {
    PlangList: Langueges[];
    langueges: Langueges[];
    nameLang: string[];
    uses: number[];
    constructor(private http: HttpClient, testComponent: TestComponent) {
        testComponent.loadData();
        this.langueges = this.PlangList.sort();
    }

    response: LanguagesStatistics = { languages: ['Node js', 'C#', 'CSS', 'JS', 'Ruby'] ,values: [100, 150, 33, 12, 75] }

    getLanguageStatistics(): Observable<LanguagesStatistics> {
        return of(this.response);
        // response.values should be array of number of users that made this test
    }

    getUserStatistics(): Observable<LanguagesStatistics> {
        return of(this.response);
        // response.values should be array of grades (in percentages) of this test
    }
}
