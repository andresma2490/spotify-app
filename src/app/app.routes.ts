import { Routes } from '@angular/router';
import { artistsRoutes } from './views/artists/artists.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/home/home.component').then((c) => c.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'artists',
    children: artistsRoutes,
  },
];
