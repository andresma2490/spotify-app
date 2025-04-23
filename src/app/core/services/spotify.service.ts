import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  searchArtist(artist: string) {
    return this.http.get(`${this.apiUrl}/search?q=${artist}&type=artist`);
  }
}
