import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { filter } from 'rxjs/internal/operators/filter';
interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, MatChipsModule, MatIconModule,MatToolbarModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(() => {
      this.createBreadcrumbs();
    });
  }

  private createBreadcrumbs(): void {
    // Get the current URL
    const url = this.router.url;
    // Split the URL into segments
    const urlSegments = url.split('/').filter(segment => segment);

    // Generate breadcrumbs
    const breadcrumbs: Breadcrumb[] = [];
    let currentUrl = '';

    // Handle the special case for the root/home path
    if (urlSegments.length === 0 || (urlSegments.length === 1 && urlSegments[0] === 'units')) {
      breadcrumbs.push({ label: 'Units', url: '/units' });
      this.breadcrumbs = breadcrumbs;
      return;
    }

    // Process each segment to build breadcrumbs
    for (let i = 0; i < urlSegments.length; i++) {
      const segment = urlSegments[i];
      currentUrl += `/${segment}`;

      // Determine the label based on the segment pattern
      if (segment === 'units' && i === 0) {
        breadcrumbs.push({ label: 'Units', url: currentUrl });
      }
      else if (segment === 'companies' && i === 2) {
        const unitId = urlSegments[1];
        breadcrumbs.push({
          label: 'Companies',
          url: currentUrl
        });
      }
      else if (segment === 'products' && i === 4) {
        breadcrumbs.push({
          label: 'Products',
          url: currentUrl
        });
      }
      else if (segment === 'subproducts' && i === 6) {
        breadcrumbs.push({
          label: 'Subproducts',
          url: currentUrl
        });
      }
      // Skip IDs in the breadcrumb display
      else if (i === 1 || i === 3 || i === 5) {
        // This is an ID segment, we'll skip adding it as a separate breadcrumb
        continue;
      }
    }

    this.breadcrumbs = breadcrumbs;
  }

}
