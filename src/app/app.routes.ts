import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/auth/landing/landing.component').then(c => c.LandingComponent),
    title: 'Login/Signup'
  },
  {
    path: 'test',
    loadComponent: () => import('./feature/auth/landing/landing.component').then(c => c.LandingComponent),
    title: 'test'
  },
  {
    path: 'home',
    loadComponent: () => import('./feature/home/home.component').then(c => c.HomeComponent),
    // canActivate: [authGuard],
    title: 'Home'
  },
  // Units
  {
    path: 'units/add',
    loadComponent: () => import('./feature/unit/add-unit/add-unit.component').then(c => c.AddUnitComponent),
    // canActivate: [authGuard],
    title: 'Add Unit'
  },
  {
    path: 'units/view',
    loadComponent: () => import('./feature/unit/view-units/view-units.component').then(c => c.ViewUnitsComponent),
    // canActivate: [authGuard],
    title: 'View Units'
  },
  // Companies
  {
    path: 'companies/add',
    loadComponent: () => import('./feature/company/add-company/add-company.component').then(c => c.AddCompanyComponent),
    // canActivate: [authGuard],
    title: 'Add Company'
  },
  {
    path: 'companies/view',
    loadComponent: () => import('./feature/company/view-companies/view-companies.component').then(c => c.ViewCompaniesComponent),
    // canActivate: [authGuard],
    title: 'View Companies'
  },
  // Products
  {
    path: 'products/add',
    loadComponent: () => import('./feature/product/add-product/add-product.component').then(c => c.AddProductComponent),
    // canActivate: [authGuard],
    title: 'Add Product'
  },
  {
    path: 'products/view',
    loadComponent: () => import('./feature/product/view-products/view-products.component').then(c => c.ViewProductsComponent),
    // canActivate: [authGuard],
    title: 'View Products'
  },
  // Subproducts
  {
    path: 'subproducts/add',
    loadComponent: () => import('./feature/sub-product/add-sub-products/add-sub-products.component').then(c => c.AddSubProductsComponent),
    // canActivate: [authGuard],
    title: 'Add Subproduct'
  },
  {
    path: 'subproducts/view',
    loadComponent: () => import('./feature/sub-product/view-sub-products/view-sub-products.component').then(c => c.ViewSubProductsComponent),
    // canActivate: [authGuard],
    title: 'View Subproducts'
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/nopagefound/nopagefound.component').then(c => c.NopagefoundComponent),
  }
];
