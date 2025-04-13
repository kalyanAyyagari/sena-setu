import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../core/services/api.service';
import { AddUnitComponent } from "../add-unit/add-unit.component";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Unit } from '../../../core/models/helperModals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../../../shared/components/details-dialog/details-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { ViewTableComponent } from "../../../shared/components/view-table/view-table.component";

@Component({
  selector: 'app-view-units',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, AddUnitComponent, MatTableModule, MatIconModule, ViewTableComponent],
  templateUrl: './view-units.component.html',
  styleUrl: './view-units.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewUnitsComponent {
  unitId: string | null = null; // Initialize unitId as null
  units = signal(new MatTableDataSource<Unit>());
  addToggle = signal(false);

  cols = [
    'NO',
    'name',
    'description',
    'actions'
  ]
  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllUnits();
  }

  getAllUnits() {
    this.units.set(new MatTableDataSource());
    this.apiService.getAllUnits().subscribe({
      next: (response: Unit[]) => {
        console.log(response);
        const dataSource = new MatTableDataSource(response);
        this.units.set(dataSource);
      },
      error: (err) => {
        console.error(err);
      },
    })
  }
  selectedUnit = signal<Unit>({ id: '', name: '', description: '', companyList: [] });
  editUnit(unit: Unit) {
    console.log('Edit unit with ID:', unit);
    this.selectedUnit.set(unit);
    this.addToggle.set(true);
  }

  deleteUnit(unitId: string) {
    console.log('Delete unit with ID:', unitId);
    this.apiService.deleteUnit(unitId).subscribe({
      next: (response) => {
        console.log(response);
        this.snackBar.open("Unit deleted successfully", 'Close', { duration: 5000 });
        this.getAllUnits();
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred while deleting the unit', 'Close', { duration: 5000 });
      },
    })
  }
  reloadList() {
    this.selectedUnit.set({ id: '', name: '', description: '', companyList: [] });
    this.addToggle.set(false);
    this.getAllUnits();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.units().filter = filterValue.trim().toLowerCase();
  }

  openDialog(row: { name: string; description: string }): void {
    this.dialog.open(DetailsDialogComponent, {
      data: row
    });
  }

}
