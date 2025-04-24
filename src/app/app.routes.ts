import { Routes } from '@angular/router';
import { artistsRoutes } from './views/artists/artists.routes';
import { usersRoutes } from './views/users/users.routes';

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
  {
    path: 'users',
    children: usersRoutes,
  },
];
