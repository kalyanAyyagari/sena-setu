import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Company } from '../../../core/models/helperModals';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCompanyComponent {
  selectedCompany = input<Company>(this.getEmptyCompanyObject());
  unitId = input.required<string>();
  addCompanyForm: FormGroup;
  reloadList = output();
  cancelAddOrUpdate = output();
  constructor(
    fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.addCompanyForm = fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    if (this.selectedCompany().id) {
      this.addCompanyForm.patchValue({
        name: this.selectedCompany()?.name,
        description: this.selectedCompany()?.description,
      });
    }
  }

  onAdd(): void {
    if (this.addCompanyForm.invalid) return;
    const formValues = this.addCompanyForm.value;
    const trimmedValues = {
      ...formValues,
      name: formValues.name?.trim(),
      description: formValues.description // don't trim description
    };
    this.apiService.createCompany(this.unitId(), trimmedValues).subscribe({
      next: (response) => {
        this.snackBar.open("Added successfully", 'Close', { duration: 5000, panelClass: 'success-snackbar' });
        this.reloadList.emit();
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred while Adding', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    })
    this.addCompanyForm.reset();
  }

  onEdit(): void {
    if (this.addCompanyForm.invalid) return;
    const formValues = this.addCompanyForm.value;
    const trimmedValues = {
      ...formValues,
      name: formValues.name?.trim(),
      description: formValues.description // don't trim description
    };
    this.apiService.updateCompany(this.unitId(), this.selectedCompany()?.id, trimmedValues).subscribe({
      next: (response) => {
        this.snackBar.open("updated successfully", 'Close', { duration: 5000, panelClass: 'success-snackbar' });
        this.reloadList.emit();
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred while updating', 'Close', { duration: 500000, panelClass: 'error-snackbar' });
      }
    })
    this.addCompanyForm.reset();
  }

  getEmptyCompanyObject(): Company {
    return {
      id: '',
      name: '',
      description: '',
    };
  }
}
