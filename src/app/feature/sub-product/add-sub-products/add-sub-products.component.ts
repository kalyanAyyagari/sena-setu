import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subproduct } from '../../../core/models/helperModals';
import { ApiService } from '../../../core/services/api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-sub-products',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-sub-products.component.html',
  styleUrl: './add-sub-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSubProductsComponent {
  selectedSubproduct = input<Subproduct>(this.getEmptySubproductObject());
  productId = input.required<string>();
  addSubproductForm: FormGroup;
  reloadList = output();
  cancelAddOrUpdate = output();
  constructor(
    fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.addSubproductForm = fb.group({
      name: ['', Validators.required],
      quantity: [0],
    });
  }

  ngOnInit(): void {
    if (this.selectedSubproduct().id) {
      this.addSubproductForm.patchValue({
        name: this.selectedSubproduct()?.name,
        quantity: this.selectedSubproduct()?.quantity,
      });
    }
  }

  onAdd(): void {
    if (this.addSubproductForm.invalid) return;
    this.apiService.createSubproduct(this.productId(), this.addSubproductForm.value).subscribe({
      next: (response) => {
        this.snackBar.open("Added successfully", 'Close', { duration: 5000 });
        this.reloadList.emit();
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred while Adding', 'Close', { duration: 5000 });
      }
    })
    this.addSubproductForm.reset();
  }

  onEdit(): void {
    if (this.addSubproductForm.invalid) return;
    this.apiService.updateSubproduct(this.productId(), this.selectedSubproduct()?.id, this.addSubproductForm.value).subscribe({
      next: (response) => {
        this.snackBar.open("updated successfully", 'Close', { duration: 5000 });
        this.reloadList.emit();
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred while updating', 'Close', { duration: 5000 });
      }
    })
    this.addSubproductForm.reset();
  }

  incrementQuantity() {
    const currentQuantity = this.addSubproductForm.get('quantity')?.value || 0;
    this.addSubproductForm.get('quantity')?.setValue(+currentQuantity + 1);
  }

  decrementQuantity() {
    const currentQuantity = this.addSubproductForm.get('quantity')?.value || 0;
    this.addSubproductForm.get('quantity')?.setValue(currentQuantity - 1);
  }

  getEmptySubproductObject(): Subproduct {
    return {
      id: '',
      name: '',
      quantity: 0,
      barcode: ''
    };
  }

  onlyNumbers(event: KeyboardEvent): boolean {
    // Allow: backspace, delete, tab, escape, enter, decimal point
    if ([46, 8, 9, 27, 13, 190].includes(event.keyCode) ||
      // Allow: Ctrl+A
      (event.keyCode === 65 && event.ctrlKey === true) ||
      // Allow: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)) {
      return true;
    }
    // Ensure that it is a number and stop the keypress if not
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
      (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
