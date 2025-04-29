import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SpotifyService } from '@app/core/services/spotify.service';
import { ListItemComponent } from '@app/shared/ui/list-item/list-item.component';
import { ListComponent } from '@app/shared/ui/list/list.component';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ListComponent, ListItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private spotifyService = inject(SpotifyService);
  searchControl = new FormControl('');
  artists: any[] = [];

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if (!value) return;

        this.spotifyService.searchArtist(value).subscribe((response: any) => {
          this.artists = response.artists.items;
        });
      });
  }
}
