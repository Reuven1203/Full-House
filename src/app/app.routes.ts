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
    path: '',
    // loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    redirectTo: '/sessions',
    pathMatch: 'full',
  },
];
