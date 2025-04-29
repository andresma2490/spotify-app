import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiTokenUrl = 'https://accounts.spotify.com/api/token';
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;

  private user_access_token = new BehaviorSubject<string | null>(
    getCookie('user_access_token') || null,
  );

  public access_token: string | null = null;

  public user_access_token$ = this.user_access_token.asObservable();
  public user_refresh_token: string | null =
    getCookie('user_refresh_token') || null;
  public user_token_expires_in: number | null = null;

  getAccessToken() {
    const access_token = getCookie('access_token');
    return access_token || null;
  }

  getUserAccessToken() {
    const user_token_expires_in = getCookie('user_token_expires_in');
    const user_access_token = getCookie('user_access_token');
    const expires_date = new Date();
    expires_date.setSeconds(
      expires_date.getSeconds() + Number(user_token_expires_in),
    );
    if (expires_date < new Date()) {
      this.logout();
      return null;
    }
    return user_access_token;
  }

  fetchAccessToken() {
    if (this.user_access_token.getValue()) {
      return this.refreshAccessToken();
    }

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
          setCookie('access_token', this.access_token || '', {
            expires: 365,
            path: '/',
          });
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
          this.user_access_token.next(response.access_token);
          this.user_refresh_token = response.refresh_token;
          this.user_token_expires_in = response.expires_in;

          this.access_token = response.access_token;
          setCookie('access_token', this.access_token || '', {
            expires: 365,
            path: '/',
          });
          setCookie('user_access_token', this.access_token || '', {
            expires: 365,
            path: '/',
          });
          setCookie('user_refresh_token', this.user_refresh_token || '', {
            expires: 365,
            path: '/',
          });
          setCookie('user_token_expires_in', this.user_token_expires_in || '', {
            expires: 365,
            path: '/',
          });
        }),
      );
  }

  logout() {
    this.user_access_token.next(null);
    this.user_refresh_token = null;
    this.user_token_expires_in = null;

    this.access_token = null;
    removeCookie('access_token');
    removeCookie('user_access_token');
  }

  refreshAccessToken() {
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', this.user_refresh_token || '');
    body.set('client_id', this.clientId);
    return this.http
      .post(this.apiTokenUrl, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        tap((response: any) => {
          this.user_access_token.next(response.access_token);
          this.user_refresh_token = response.refresh_token;
          this.user_token_expires_in = response.expires_in;

          this.access_token = response.access_token;
          setCookie('access_token', this.access_token || '', {
            expires: 365,
            path: '/',
          });
          setCookie('user_access_token', this.access_token || '', {
            expires: 365,
            path: '/',
          });
          setCookie('user_refresh_token', this.user_refresh_token || '', {
            expires: 365,
            path: '/',
          });
          setCookie('user_token_expires_in', this.user_token_expires_in || '', {
            expires: 365,
            path: '/',
          });
        }),
      );
  }
}
