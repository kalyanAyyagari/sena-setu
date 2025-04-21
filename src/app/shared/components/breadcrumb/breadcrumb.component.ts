import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { filter } from 'rxjs/internal/operators/filter';
import { ApiService } from '../../../core/services/api.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';


interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, MatChipsModule, MatIconModule, MatToolbarModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
  breadcrumbs = signal<Breadcrumb[]>([]);
  displayBreadcrumbs = signal<boolean>(true);

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(() => {
      this.createBreadcrumbs();
    });
  }

  private async createBreadcrumbs(): Promise<void> {
    const url = this.router.url;
    const urlSegments = url.split('/').filter(segment => segment);

    if (urlSegments.includes('account-management') || urlSegments.includes('login')) {
      this.displayBreadcrumbs.set(false);
      return;
    }

    this.displayBreadcrumbs.set(true);
    const breadcrumbs: Breadcrumb[] = [];
    let currentUrl = '';

    // Always show Units for home page
    if (urlSegments.length === 0 || (urlSegments.length === 1 && urlSegments[0] === 'units')) {
      breadcrumbs.push({ label: 'Units', url: '/units' });
      this.breadcrumbs.set(breadcrumbs);
      return;
    }

    try {
      // Process each segment to build breadcrumbs
      for (let i = 0; i < urlSegments.length; i++) {
        const segment = urlSegments[i];
        currentUrl += `/${segment}`;

        if (segment === 'units' && i === 0) {
          breadcrumbs.push({ label: 'Units', url: currentUrl });
        }
        else if (i === 1) { // Unit ID
          const unitId = segment;
          const unit = await firstValueFrom(this.apiService.getUnit(unitId));
          if (unit) {
            breadcrumbs.push({ label: unit.name, url: currentUrl + '/' + urlSegments[i + 1] });
          }
        }
        else if (i === 3) { // Company ID
          const companyId = segment;
          const company = await firstValueFrom(this.apiService.getCompany(companyId));
          if (company) {
            breadcrumbs.push({ label: company.name, url: currentUrl + '/' + urlSegments[i + 1] });
          }
        }
        else if (i === 5) { // Product ID
          const productId = segment;
          const product = await firstValueFrom(this.apiService.getProduct(productId));
          if (product) {
            breadcrumbs.push({ label: product.name, url: currentUrl + '/' + urlSegments[i + 1] });
          }
        }
      }

      this.breadcrumbs.set(breadcrumbs);
    } catch (error) {
      console.error('Error fetching entity details for breadcrumbs:', error);
      // In case of error, fall back to basic breadcrumbs
      this.createBasicBreadcrumbs(urlSegments);
    }
  }

  private createBasicBreadcrumbs(urlSegments: string[]): void {
    const breadcrumbs: Breadcrumb[] = [];
    let currentUrl = '';

    for (let i = 0; i < urlSegments.length; i++) {
      const segment = urlSegments[i];
      currentUrl += `/${segment}`;

      if (segment === 'units' && i === 0) {
        breadcrumbs.push({ label: 'Units', url: currentUrl });
      }
      // Skip the generic labels and only add IDs if entity names can't be fetched
      else if (i === 1 || i === 3 || i === 5) {
        breadcrumbs.push({ label: segment, url: currentUrl });
      }
    }

    this.breadcrumbs.set(breadcrumbs);
  }
}
