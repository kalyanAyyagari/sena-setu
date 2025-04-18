import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {
  signupForm: FormGroup;
  loginForm: FormGroup;
  returnUrl: string;
  selectedTabIndex = signal(0);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: [''],
      armyNumber: ['', Validators.required],
      company: ['', Validators.required],
      rank: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/units';
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignupSubmit(): void {
    if (this.signupForm.invalid) return;

    this.authService.signup(this.signupForm.value).subscribe({
      next: (response) => {
        this.snackBar.open('Account created successfully!', 'Close', { duration: 3000 });
        this.selectedTabIndex.set(0);
        this.signupForm.reset();
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred during signup', 'Close', { duration: 5000 });
      },
    });
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.authService.setUser(response);
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (error) => {
        this.snackBar.open(error?.error?.message ?? 'An error occurred during login', 'Close', { duration: 5000 });
      },
    });
  }
}
