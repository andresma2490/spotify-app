import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SpotifyService } from '@app/core/services/spotify.service';
import { ListItemComponent } from '@app/shared/ui/list-item/list-item.component';
import { ListComponent } from '@app/shared/ui/list/list.component';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [RouterLink, ListComponent, ListItemComponent],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css',
})
export class AlbumsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private spotifyService = inject(SpotifyService);

  albums: any[] = [];
  artistId: string = '';
  artistName: string = '';

  ngOnInit(): void {
    this.artistId = this.route.snapshot.paramMap.get('artistId')!;
    this.spotifyService
      .getArtistAlbums(this.artistId)
      .subscribe((response: any) => {
        this.albums = response.items;
        this.artistName = response.items[0].artists[0].name;
      });
  }
}
