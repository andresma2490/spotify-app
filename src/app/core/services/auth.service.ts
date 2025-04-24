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
  public token_expires_in: number | null = null;

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
          this.token_expires_in = response.expires_in;
        }),
      );
  }
}
