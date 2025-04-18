import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Unit } from '../../../core/models/helperModals';

@Component({
  selector: 'app-add-unit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-unit.component.html',
  styleUrl: './add-unit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUnitComponent {
  selectedUnit = input<Unit>({ id: '', name: '', description: '', companyList: [] });
  addUnitForm: FormGroup;
  reloadList = output();
  cancelAddOrUpdate = output();
  constructor(
    fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.addUnitForm = fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    if (this.selectedUnit().id) {
      this.addUnitForm.patchValue({
        name: this.selectedUnit()?.name,
        description: this.selectedUnit()?.description
      });
    }
  }

  onAdd(): void {
    if (this.addUnitForm.invalid) return;
    this.apiService.createUnit(this.addUnitForm.value).subscribe({
      next: (response) => {
        this.snackBar.open("Unit created successfully", 'Close', { duration: 5000 });
        this.reloadList.emit();
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred while updating the unit', 'Close', { duration: 5000 });
      }
    })
    this.addUnitForm.reset();
  }

  onEdit(): void {
    if (this.addUnitForm.invalid) return;
    this.apiService.updateUnit(this.selectedUnit()?.id, this.addUnitForm.value).subscribe({
      next: (response) => {
        this.snackBar.open("Unit updated successfully", 'Close', { duration: 5000 });
        this.reloadList.emit();
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred while updating the unit', 'Close', { duration: 5000 });
      }
    })
    this.addUnitForm.reset();
  }
  onCancel(): void {
    // Handle cancel action here
  }
}
