import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Globals } from './globals';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AboutComponent } from './about/about.component';
import { AnswersComponent } from './answers/answers.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LanguageStatisticsComponent } from './statistics/language-statistics/language-statistics.component';
import { UserStatisticsComponent } from './statistics/user-statistics/user-statistics.component';
import { TestComponent } from './test/test.component';

import { SubjectService } from 'services/subject.service';
import { StatisticsService } from 'services/statistics.service';
import { LanguageService } from 'services/language.service';
import { QuestionService } from 'services/questions.service';
import { AnswersService } from 'services/answers.service';
import { TestResultsComponent } from './test-results/test-results.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CommonModule,
    ChartsModule,
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    AboutComponent,
    AnswersComponent,
    StatisticsComponent,
    TestComponent,
    LanguageStatisticsComponent,
    UserStatisticsComponent,
    TestResultsComponent
  ],
  entryComponents: [TestResultsComponent],
  providers: [ Globals, SubjectService, LanguageService, QuestionService, AnswersService, StatisticsService ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
