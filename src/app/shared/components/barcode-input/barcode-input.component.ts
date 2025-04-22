import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-barcode-input',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatTableModule, MatIconModule],
  templateUrl: './barcode-input.component.html',
  styleUrl: './barcode-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarcodeInputComponent {
    constructor(
      private apiService: ApiService,
      private snackBar: MatSnackBar,
      private router: Router
    ) {}

  @ViewChild('barcodeInput') barcodeInput!: ElementRef;

  onBarcodeScanned(barcode: string) {
    if (!barcode.trim()) return;

    this.apiService.getDetailsByBarcode(barcode.trim()).subscribe({
      next: (response) => {
        const unit = response;
        const company = unit?.companyList?.[0];
        const product = company?.productList?.[0];
        const subproduct = product?.subProductList?.[0];

        if (unit?.id && company?.id && product?.id && subproduct) {
          // Create the URL with query parameter
          const url = `/units/${unit.id}/companies/${company.id}/products/${product.id}/subproducts`;

          // Force reload by first navigating to a dummy route then back with query params
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([url], {
              queryParams: {
                filter: subproduct.barcode
              }
            });
          });
        } else {
          this.snackBar.open('Unable to locate the complete path for this subproduct', 'Close',
            { duration: 5000, panelClass: 'error-snackbar' });
        }

        // Clear and focus input for next scan
        this.barcodeInput.nativeElement.value = '';
        this.barcodeInput.nativeElement.focus();
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'Subproduct not found', 'Close',
          { duration: 5000, panelClass: 'error-snackbar' });
        // Clear and focus input for next scan
        this.barcodeInput.nativeElement.value = '';
        this.barcodeInput.nativeElement.focus();
      }
    });
  }
}
