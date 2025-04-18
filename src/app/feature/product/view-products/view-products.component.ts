import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../../core/models/helperModals';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ViewTableComponent } from '../../../shared/components/view-table/view-table.component';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatTableModule, MatIconModule, ViewTableComponent, AddProductComponent],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewProductsComponent {
  unitId: string = '';
  companyId: string = '';
  products = signal(new MatTableDataSource<Product>());
  addToggle = signal(false);

  cols = [
    { name: 'Name', value: 'name' },
    { name: 'Description', value: 'description' },
    { name: 'Actions', value: 'actions' }
  ];

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.unitId = this.route.snapshot.paramMap.get('unitId') as string;
    this.companyId = this.route.snapshot.paramMap.get('companyId') as string;
    this.getProductsByCompanyId(this.companyId);
  }

  getProductsByCompanyId(companyId: string) {
    this.products.set(new MatTableDataSource());
    this.apiService.getProductsByCompanyId(companyId).subscribe({
      next: (response) => {
        const dataSource = new MatTableDataSource(response);
        this.products.set(dataSource);
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open(error?.error?.message ?? 'An error occurred while fetching', 'Close', { duration: 5000 });
      }
    })
  }

  getAllProducts() {
    this.products.set(new MatTableDataSource());
    this.apiService.getAllProducts().subscribe({
      next: (response: Product[]) => {
        const dataSource = new MatTableDataSource(response);
        this.products.set(dataSource);
      },
      error: (err) => {
        console.error(err);
      },
    })
  }
  selectedProduct = signal<Product>(this.getEmptyProductObject());
  editProduct(product: Product) {
    this.selectedProduct.set(product);
    this.addToggle.set(true);
  }

  deleteProduct(productId: string) {
    this.apiService.deleteProduct(productId).subscribe({
      next: (response) => {
        this.snackBar.open("deleted successfully", 'Close', { duration: 5000 });
        this.getProductsByCompanyId(this.companyId);
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred while deleting', 'Close', { duration: 5000 });
      },
    })
  }
  reloadList() {
    this.selectedProduct.set(this.getEmptyProductObject());
    this.addToggle.set(false);
    this.getProductsByCompanyId(this.companyId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products().filter = filterValue.trim().toLowerCase();
  }

  cancelAddOrUpdate() {
    this.selectedProduct.set(this.getEmptyProductObject());
    this.addToggle.set(false);
  }

  goToSubProduct(productId: string) {
    this.router.navigate([`/units/${this.unitId}/companies/${this.companyId}/products/${productId}/subproducts`]);
  }

  getEmptyProductObject(): Product {
    return {
      id: '',
      name: '',
      description: '',
    };
  }
}
