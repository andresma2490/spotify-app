import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SpotifyService } from '@app/core/services/spotify.service';
import { DurationPipe } from '@app/shared/pipes/duration.pipe';
import { ListItemComponent } from '@app/shared/ui/list-item/list-item.component';
import { ListComponent } from '@app/shared/ui/list/list.component';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [ListComponent, ListItemComponent, DurationPipe],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css',
})
export class SongsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private spotifyService = inject(SpotifyService);

  songs: any[] = [];
  albumId: string = '';
  // albumName: string = '';

  ngOnInit(): void {
    this.albumId = this.route.snapshot.paramMap.get('albumId')!;
    this.spotifyService
      .getAlbumSongs(this.albumId)
      .subscribe((response: any) => {
        this.songs = response.items;
        // this.albumName = response.items[0].album.name;
      });
  }
}
