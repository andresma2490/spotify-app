import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  searchArtist(artist: string) {
    return this.http.get(`${this.apiUrl}/search?q=${artist}&type=artist`);
  }

  getArtistAlbums(artistId: string) {
    return this.http.get(`${this.apiUrl}/artists/${artistId}/albums`);
  }

  getAlbumSongs(albumId: string) {
    return this.http.get(`${this.apiUrl}/albums/${albumId}/tracks`);
  }

  getUserPlaylists() {
    return this.http.get(`${this.apiUrl}/me/playlists`);
  }

  getPlaylistTracks(playlistId: string) {
    return this.http.get(`${this.apiUrl}/playlists/${playlistId}/tracks`);
  }
}
