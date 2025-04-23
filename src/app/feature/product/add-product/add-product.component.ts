import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../../core/models/helperModals';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductComponent {
  selectedProduct = input<Product>(this.getEmptyProductObject());
  companyId = input.required<string>();
  addProductForm: FormGroup;
  reloadList = output();
  cancelAddOrUpdate = output();
  constructor(
    fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.addProductForm = fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    if (this.selectedProduct().id) {
      this.addProductForm.patchValue({
        name: this.selectedProduct()?.name,
        description: this.selectedProduct()?.description,
      });
    }
  }

  onAdd(): void {
    if (this.addProductForm.invalid) return;
    const formValues = this.addProductForm.value;
    const trimmedValues = {
      ...formValues,
      name: formValues.name?.trim(),
      description: formValues.description // don't trim description
    };
    this.apiService.createProduct(this.companyId(), trimmedValues).subscribe({
      next: (response) => {
        this.snackBar.open("Added successfully", 'Close', { duration: 5000, panelClass: 'success-snackbar' });
        this.reloadList.emit();
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred while Adding', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    })
    this.addProductForm.reset();
  }

  onEdit(): void {
    if (this.addProductForm.invalid) return;
    const formValues = this.addProductForm.value;
    const trimmedValues = {
      ...formValues,
      name: formValues.name?.trim(),
      description: formValues.description // don't trim description
    };
    this.apiService.updateProduct(this.companyId(), this.selectedProduct()?.id, trimmedValues).subscribe({
      next: (response) => {
        this.snackBar.open("updated successfully", 'Close', { duration: 5000, panelClass: 'success-snackbar' });
        this.reloadList.emit();
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred while updating', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    })
    this.addProductForm.reset();
  }

  getEmptyProductObject(): Product {
    return {
      id: '',
      name: '',
      description: '',
    };
  }
}
