import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'units'
  },
  {
    path: 'login',
    loadComponent: () => import('./feature/auth/landing/landing.component').then(c => c.LandingComponent),
    title: 'Login/Signup'
  },
  {
    path: 'units',
    loadComponent: () => import('./feature/unit/view-units/view-units.component')
      .then(c => c.ViewUnitsComponent),
    canActivate: [authGuard],
    title: 'Units'
  },
  {
    path: 'account-management',
    loadComponent: () => import('./shared/components/account-management/account-management.component')
      .then(c => c.AccountManagementComponent),
    canActivate: [authGuard],
    title: 'Account Management'
  },
  {
    path: 'units/:unitId/companies',
    loadComponent: () => import('./feature/company/view-companies/view-companies.component')
      .then(c => c.ViewCompaniesComponent),
    canActivate: [authGuard],
    title: 'Companies'
  },
  {
    path: 'units/:unitId/companies/:companyId/products',
    loadComponent: () => import('./feature/product/view-products/view-products.component')
      .then(c => c.ViewProductsComponent),
    canActivate: [authGuard],
    title: 'Products'
  },
  {
    path: 'units/:unitId/companies/:companyId/products/:productId/subproducts',
    loadComponent: () => import('./feature/sub-product/view-sub-products/view-sub-products.component')
      .then(c => c.ViewSubProductsComponent),
    canActivate: [authGuard],
    title: 'Subproducts'
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/nopagefound/nopagefound.component').then(c => c.NopagefoundComponent),
    title: '404 Not Found'
  }
];
