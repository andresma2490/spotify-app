import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiTokenUrl = 'https://accounts.spotify.com/api/token';
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;

  public access_token: string | null = null;

  public user_access_token: string | null = null;
  public user_refresh_token: string | null = null;
  public user_token_expires_in: number | null = null;

  getAccessToken() {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    return this.http
      .post(this.apiTokenUrl, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
        },
      })
      .pipe(
        tap((response: any) => {
          this.access_token = response.access_token;
          localStorage.setItem('access_token', this.access_token || '');
        }),
      );
  }

  login(code: string) {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('redirect_uri', environment.redirectUri);
    return this.http
      .post(this.apiTokenUrl, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
        },
      })
      .pipe(
        tap((response: any) => {
          this.user_access_token = response.access_token;
          this.user_refresh_token = response.refresh_token;
          this.user_token_expires_in = response.expires_in;

          this.access_token = this.user_access_token;
          localStorage.setItem('access_token', this.access_token || '');
          localStorage.setItem('user_access_token', this.access_token || '');
        }),
      );
  }
}
