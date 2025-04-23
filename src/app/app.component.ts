import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent {
  private authService = inject(AuthService);
  title = 'spotify-app';

  constructor() {
    this.authService.getAccessToken().subscribe();
  }
}
