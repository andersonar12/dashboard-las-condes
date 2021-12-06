import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import {  HomeComponent } from './home/home.component';
import { StatisticsComponent } from './statistics/statistics.component';


export const PagesRoutes: Routes = [
  {
    path: '',
    component:PagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'statistics', component: StatisticsComponent }
    ],
  },
];
