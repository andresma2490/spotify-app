import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from './shared/ui/breadcrumb/breadcrumb.component';
import { LoginComponent } from './views/auth/components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BreadcrumbComponent, LoginComponent],
  template: `
    <div class="flex flex-wrap justify-between p-3">
      <app-breadcrumb></app-breadcrumb>
      <app-login></app-login>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'spotify-app';
}
