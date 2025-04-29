import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private authUrl = 'https://accounts.spotify.com/authorize';
  private clientId = environment.clientId;
  private redirectUri = environment.redirectUri;

  user_access_token$ = this.authService.user_access_token$;

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
    this.authService.logout();
  }
}
