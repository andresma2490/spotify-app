import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { authGuard } from '@app/core/guards/auth.guard';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'playlists',
        loadComponent: () =>
          import('./views/playlists/playlists.component').then(
            (c) => c.PlaylistsComponent,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'playlists/:id',
        loadComponent: () =>
          import('./views/playlist-songs/playlist-songs.component').then(
            (c) => c.PlaylistSongsComponent,
          ),
        canActivate: [authGuard],
      },
    ],
  },
];
