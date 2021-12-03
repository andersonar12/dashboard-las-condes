import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { FirstPageComponent } from './first-page/first-page.component';


export const PagesRoutes: Routes = [
  {
    path: '',
    component:PagesComponent,
    children: [
      { path: 'first-page', component: FirstPageComponent }
    ],
  },
];
