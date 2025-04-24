import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authUrl = 'https://accounts.spotify.com/authorize';
  private clientId = environment.clientId;
  private redirectUri = environment.redirectUri;

  user_access_token: string | null = localStorage.getItem('user_access_token');

  login() {
    const scope = 'user-read-private user-read-email playlist-read-private';
    const authorizationUrl =
      `${this.authUrl}?client_id=${this.clientId}` +
      `&redirect_uri=${encodeURIComponent(this.redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&response_type=code` +
      `&show_dialog=true`;

    window.location.href = authorizationUrl;
  }

  logout() {
    localStorage.removeItem('user_access_token');
    this.user_access_token = null;
    window.location.href = '/';
  }
}
