import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  entityTypes = [
    { name: 'Unit', type: 'units', icon: 'business' },
    { name: 'Company', type: 'companies', icon: 'domain' },
    { name: 'Product', type: 'products', icon: 'inventory_2' },
    { name: 'Subproduct', type: 'subproducts', icon: 'category' }
  ];

  constructor(private router: Router) {}

  navigateTo(action: 'add' | 'view', entityType: string): void {
    this.router.navigate([`/${entityType}/${action}`]);
  }
}
