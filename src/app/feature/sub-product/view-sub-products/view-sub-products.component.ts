import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subproduct } from '../../../core/models/helperModals';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ViewTableComponent } from '../../../shared/components/view-table/view-table.component';
import { AddSubProductsComponent } from '../add-sub-products/add-sub-products.component';

@Component({
  selector: 'app-view-sub-products',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatTableModule, MatIconModule, ViewTableComponent, AddSubProductsComponent],
  templateUrl: './view-sub-products.component.html',
  styleUrl: './view-sub-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewSubProductsComponent {
  unitId: string = '';
  companyId: string = '';
  productId: string = '';
  subproducts = signal(new MatTableDataSource<Subproduct>());
  addToggle = signal(false);

  cols = [
    { name: 'Subproduct', value: 'name' },
    { name: 'Barcode', value: 'barcode' },
    { name: 'Quantity', value: 'quantity' },
    { name: 'Actions', value: 'actions' }
  ];

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.unitId = this.route.snapshot.paramMap.get('unitId') as string;
    this.companyId = this.route.snapshot.paramMap.get('companyId') as string;
    this.productId = this.route.snapshot.paramMap.get('productId') as string;
    this.getSubproductsByProductId(this.productId);
  }

  getSubproductsByProductId(productId: string) {
    this.subproducts.set(new MatTableDataSource());
    this.apiService.getSubproductsByProductId(productId).subscribe({
      next: (response) => {
        const dataSource = new MatTableDataSource(response);
        this.subproducts.set(dataSource);
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open(error?.error?.message ?? 'An error occurred while fetching', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    })
  }

  getAllSubproducts() {
    this.subproducts.set(new MatTableDataSource());
    this.apiService.getAllSubproducts().subscribe({
      next: (response: Subproduct[]) => {
        const dataSource = new MatTableDataSource(response);
        this.subproducts.set(dataSource);
      },
      error: (err) => {
        console.error(err);
      },
    })
  }
  selectedSubproduct = signal<Subproduct>(this.getEmptySubproductObject());
  editSubproduct(subproduct: Subproduct) {
    this.selectedSubproduct.set(subproduct);
    this.addToggle.set(true);
  }

  deleteSubproduct(subproductId: string) {
    if (confirm(`Are you sure you want to delete`)) {
      this.apiService.deleteSubproduct(subproductId).subscribe({
        next: (response) => {
          this.snackBar.open("deleted successfully", 'Close', { duration: 5000, panelClass: 'success-snackbar' });
          this.getSubproductsByProductId(this.productId);
        },
        error: (error) => {
          this.snackBar.open(error?.error?.message ?? 'An error occurred while deleting', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        },
      })
    }
  }
  reloadList() {
    this.selectedSubproduct.set(this.getEmptySubproductObject());
    this.addToggle.set(false);
    this.getSubproductsByProductId(this.productId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subproducts().filter = filterValue.trim().toLowerCase();
  }

  cancelAddOrUpdate() {
    this.selectedSubproduct.set(this.getEmptySubproductObject());
    this.addToggle.set(false);
  }

  // goToSubSubproduct(subproductId: string) {
  //   this.router.navigate([`/units/${this.unitId}/companies/${this.companyId}/products/${productId}/subproducts`]);
  // }

  getEmptySubproductObject(): Subproduct {
    return {
      id: '',
      name: '',
      quantity: 0,
      barcode: ''
    };
  }
}
