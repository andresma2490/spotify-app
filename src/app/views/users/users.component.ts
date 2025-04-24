import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class UsersComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  code: string | null = null;

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParamMap.get('code');
    if (this.code) {
      this.authService.login(this.code).subscribe(() => {
        this.router.navigate(['/users/playlists']);
      });
    }
  }
}
