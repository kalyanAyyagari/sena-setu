import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../core/services/api.service';
import { AddUnitComponent } from "../add-unit/add-unit.component";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Unit } from '../../../core/models/helperModals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ViewTableComponent } from "../../../shared/components/view-table/view-table.component";
import { Router } from '@angular/router';
import { BarcodeInputComponent } from "../../../shared/components/barcode-input/barcode-input.component";

@Component({
  selector: 'app-view-units',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, AddUnitComponent, MatTableModule, MatIconModule, ViewTableComponent, BarcodeInputComponent],
  templateUrl: './view-units.component.html',
  styleUrl: './view-units.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewUnitsComponent {
  unitId: string | null = null; // Initialize unitId as null
  units = signal(new MatTableDataSource<Unit>());
  addToggle = signal(false);
  editOrDeleteAcess = false;

  cols = [
    { name: 'Name', value: 'name' },
    { name: 'Description', value: 'description' },
    { name: 'Actions', value: 'actions' }
  ]

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUnits();
    this.editOrDeleteAcess = this.apiService.getEditOrDeleteAccess();
  }

  getAllUnits() {
    this.units.set(new MatTableDataSource());
    this.apiService.getAllUnits().subscribe({
      next: (response: Unit[]) => {
        const dataSource = new MatTableDataSource(response);
        this.units.set(dataSource);
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred while fetching units', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      },
    })
  }
  selectedUnit = signal<Unit>({ id: '', name: '', description: '', companyList: [] });
  editUnit(unit: Unit) {
    this.selectedUnit.set(unit);
    this.addToggle.set(true);
  }

  deleteUnit(unitId: string) {
    if (confirm(`Are you sure you want to delete`)) {
      this.apiService.deleteUnit(unitId).subscribe({
        next: (response) => {
          this.snackBar.open("Unit deleted successfully", 'Close', { duration: 5000, panelClass: 'success-snackbar' });
          this.getAllUnits();
        },
        error: (error) => {
          this.snackBar.open(error?.error?.message ?? 'An error occurred while deleting the unit', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        },
      })
    }
  }
  reloadList() {
    this.selectedUnit.set({ id: '', name: '', description: '', companyList: [] });
    this.addToggle.set(false);
    this.getAllUnits();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.units().filter = filterValue.trim().toLowerCase();
  }

  cancelAddOrUpdate() {
    this.selectedUnit.set({ id: '', name: '', description: '', companyList: [] });
    this.addToggle.set(false);
  }

  goToUnit(unitId: string) {
    this.router.navigate([`/units/${unitId}/companies`]);
  }
}
