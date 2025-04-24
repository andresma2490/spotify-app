import { Routes } from '@angular/router';
import { ArtistsComponent } from './artists.component';

export const artistsRoutes: Routes = [
  {
    path: '',
    component: ArtistsComponent,
    children: [
      {
        path: ':artistId',
        loadComponent: () =>
          import('./views/albums/albums.component').then(
            (c) => c.AlbumsComponent,
          ),
      },
      {
        path: ':artistId/albums/:albumId',
        loadComponent: () =>
          import('./views/songs/songs.component').then((c) => c.SongsComponent),
      },
    ],
  },
];
