import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Log, User } from '../../../core/models/helperModals';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatInputModule, MatButtonModule,
    MatIconModule, FormsModule, MatFormFieldModule, MatCardModule,
    MatSnackBarModule, MatTabsModule, MatPaginator
  ],
  templateUrl: './account-management.component.html',
  styleUrl: './account-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountManagementComponent {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  displayedColumns = ['name', 'role', 'rank', 'armyNumber', 'company', 'actions'];
  users = signal(new MatTableDataSource<User>());
  logs = signal(new MatTableDataSource<Log>());
  @ViewChild(MatPaginator) logsPaginator!: MatPaginator;
  currentUser = signal<User | null>(null);
  filterValue = signal('');

  // Add a signal to store total log count for paginator
  logsTotalCount = signal(0);

  isAdmin = computed(() => this.currentUser()?.role === 'ADMIN');

  constructor() {
    this.loadCurrentUser();
    this.loadUsers();
    this.loadLogs();
  }

  ngAfterViewInit() {
    this.logs().paginator = this.logsPaginator;
  }

  private loadCurrentUser(): void {
    this.currentUser.set(this.authService.getUser());
  }

  private loadUsers(): void {
    if (this.isAdmin()) {
      this.apiService.getAllUsers().subscribe({
        next: (users) => this.users.set(new MatTableDataSource(users.filter(user => user.id !== this.currentUser()?.id))),
        error: (error) => this.showError('Failed to load users')
      });
    }
  }
  private loadLogs(pageNumber: number = 0): void {
    if (this.isAdmin()) {
      this.apiService.getLogs(pageNumber).subscribe({
        next: (logs) => {
          this.logs.set(new MatTableDataSource(logs?.content));
          this.logsTotalCount.set(logs?.totalItems || 0);
          this.logsPaginator.length = logs?.totalItems;
          this.logsPaginator.pageIndex = logs?.currentPage;
        },
        error: (error) => this.showError('Failed to load logs')
      });
    }
  }

  applyFilter(event: Event, type: 'users' | 'logs'): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this[type]().filter = filterValue.trim().toLowerCase();
  }

  onLogsPageChange(event: any) {
    this.loadLogs(event.pageIndex);
    this.logs().paginator = this.logsPaginator;
  }

  makeAdmin(user: User): void {
    if (confirm(`Are you sure you want to make ${user.name} an admin?`)) {
      this.apiService.makeUserAdmin(user.name).subscribe({
        next: () => {
          this.loadUsers();
          this.showSuccess(`${user.name} is now an admin`);
        },
        error: (error) => this.showError('Failed to update user role')
      });
    }
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.apiService.deleteUser(user.id).subscribe({
        next: () => {
          this.loadUsers();
          this.showSuccess(`User deleted successfully`);
        },
        error: (error) => this.showError('Failed to delete user')
      });
    }
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: 'success-snackbar' });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 5000, panelClass: 'error-snackbar' });
  }
}
