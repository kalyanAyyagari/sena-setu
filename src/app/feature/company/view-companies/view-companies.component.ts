import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ViewTableComponent } from '../../../shared/components/view-table/view-table.component';
import { AddCompanyComponent } from '../add-company/add-company.component';
import { Company } from '../../../core/models/helperModals';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-companies',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatTableModule, MatIconModule, ViewTableComponent, AddCompanyComponent],
  templateUrl: './view-companies.component.html',
  styleUrl: './view-companies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewCompaniesComponent {
  unitId: string = '';
  companies = signal(new MatTableDataSource<Company>());
  addToggle = signal(false);
  editOrDeleteAcess = false;
  cols = [
    'Open',
    'name',
    'description',
    'actions'
  ]
  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.unitId = this.route.snapshot.paramMap.get('unitId') as string;
    this.getCompaniesByUnitId(this.unitId);
    this.editOrDeleteAcess = this.apiService.getEditOrDeleteAccess();
  }

  getCompaniesByUnitId(unitId: string) {
    this.companies.set(new MatTableDataSource());
    this.apiService.getCompaniesByUnitId(unitId).subscribe({
      next: (response) => {
        console.log(response);
        const dataSource = new MatTableDataSource(response);
        this.companies.set(dataSource);
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open(error?.error?.message ?? 'An error occurred while fetching', 'Close', { duration: 5000 });
      }
    })
  }

  getAllCompanies() {
    this.companies.set(new MatTableDataSource());
    this.apiService.getAllCompanies().subscribe({
      next: (response: Company[]) => {
        console.log(response);
        const dataSource = new MatTableDataSource(response);
        this.companies.set(dataSource);
      },
      error: (err) => {
        console.error(err);
      },
    })
  }
  selectedCompany = signal<Company>(this.getEmptyCompanyObject());
  editCompany(company: Company) {
    console.log('Edit company with ID:', company);
    this.selectedCompany.set(company);
    this.addToggle.set(true);
  }

  deleteCompany(companyId: string) {
    console.log('Delete company with ID:', companyId);
    this.apiService.deleteCompany(companyId).subscribe({
      next: (response) => {
        console.log(response);
        this.snackBar.open("deleted successfully", 'Close', { duration: 5000 });
        this.getCompaniesByUnitId(this.unitId);
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred while deleting', 'Close', { duration: 5000 });
      },
    })
  }
  reloadList() {
    this.selectedCompany.set(this.getEmptyCompanyObject());
    this.addToggle.set(false);
    this.getCompaniesByUnitId(this.unitId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.companies().filter = filterValue.trim().toLowerCase();
  }

  cancelAddOrUpdate() {
    this.selectedCompany.set(this.getEmptyCompanyObject());
    this.addToggle.set(false);
  }

  goToCompany(companyId: string) {
    this.router.navigate([`/units/${this.unitId}/companies/${companyId}/products`]);
  }

  getEmptyCompanyObject(): Company {
    return {
      id: '',
      name: '',
      description: '',
    };
  }
}
