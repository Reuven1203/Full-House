import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'sessions',
    loadComponent: () => import('./tabs/home-page/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'sessions/:sessionId',
    loadComponent: () => import('./tabs/home-page/sessions/session/session-info/session-info.page').then((m) => m.SessionInfoPage),
  },
  {
    path: 'tab1',
    loadComponent: () => import('./tabs/tab1/tab1.page').then((m) => m.Tab1Page),

  },
  {
    path: 'tab3',
    loadComponent: () => import('./tabs/tab3/tab3.page').then((m) => m.Tab3Page),

  },
  {
    path: '',
    // loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    redirectTo: '/sessions',
    pathMatch: 'full',
  },
];
