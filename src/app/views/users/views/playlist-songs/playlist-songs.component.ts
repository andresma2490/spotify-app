import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '@app/core/services/spotify.service';
import { DurationPipe } from '@app/shared/pipes/duration.pipe';
import { ListItemComponent } from '@app/shared/ui/list-item/list-item.component';
import { ListComponent } from '@app/shared/ui/list/list.component';

@Component({
  selector: 'app-playlist-songs',
  standalone: true,
  imports: [ListComponent, ListItemComponent, DurationPipe],
  templateUrl: './playlist-songs.component.html',
  styleUrl: './playlist-songs.component.css',
})
export class PlaylistSongsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private spotifyService = inject(SpotifyService);

  playlistId: string = '';
  songs: any[] = [];

  ngOnInit(): void {
    this.playlistId = this.route.snapshot.paramMap.get('id')!;

    this.spotifyService
      .getPlaylistTracks(this.playlistId)
      .subscribe((data: any) => {
        this.songs = data.items.map((item: any) => item.track);
      });
  }
}
