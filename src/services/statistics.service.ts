import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LanguagesStatistics } from './models/languagesStatistics';
import { Langueges } from './models/langueges';
import { LanguageService } from '../services/language.service';
// import { userInfo } from 'os';
// import { forEach } from '@angular/router/src/utils/collection';

@Injectable()
export class StatisticsService {
    PlangList: Langueges[];
    langueges: Langueges[];
    nameLang: string[];
    uses: number[];
    name = 'user';

    constructor(private http: HttpClient, private languageService: LanguageService) {
    }
       getLanguageStatistics(): Observable<Langueges[]> {
       return  this.languageService.getLanguegesUses()
    }

    getUserStatistics(): Observable<LanguagesStatistics> {
        return of();
    }
}
