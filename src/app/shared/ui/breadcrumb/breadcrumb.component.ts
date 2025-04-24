import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent implements OnInit {
  private router = inject(Router);
  pathSegments: string[] = [];

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.pathSegments = event.urlAfterRedirects
          .split('/')
          .filter((segment: string) => segment);
      });
  }

  buildLink(index: number): string[] | null {
    const link = ['/'];
    const noLinksList = ['artists', 'albums'];
    if (noLinksList.includes(this.pathSegments[index])) {
      return null;
    }
    for (let i = 0; i <= index; i++) {
      link.push(this.pathSegments[i]);
    }
    return link;
  }
}
