import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AboutComponent } from './about/about.component';
import { AnswersComponent } from './answers/answers.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'answers', component: AnswersComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'test', component: TestComponent },
  { path: '', redirectTo: 'test', pathMatch: 'full' },
  { path: '**', redirectTo: 'test' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }




