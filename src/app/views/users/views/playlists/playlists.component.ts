import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SpotifyService } from '@app/core/services/spotify.service';
import { ListItemComponent } from '@app/shared/ui/list-item/list-item.component';
import { ListComponent } from '@app/shared/ui/list/list.component';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [RouterLink, ListComponent, ListItemComponent],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css',
})
export class PlaylistsComponent implements OnInit {
  private spotifyService = inject(SpotifyService);
  playlists: any[] = [];

  ngOnInit(): void {
    this.spotifyService.getUserPlaylists().subscribe((playlists: any) => {
      console.log(playlists);
      this.playlists = playlists.items;
    });
  }
}
