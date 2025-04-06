import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private apiService: ApiService,
    // private storageService: StorageService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    // this.apiService.signup(this.signupForm.value).subscribe({
    //   next: (response) => {
    //     this.storageService.setToken(response.token);
    //     this.storageService.setUser(response.user);
    //     this.snackBar.open('Account created successfully!', 'Close', { duration: 3000 });
    //     this.router.navigate(['/home']);
    //   },
    //   error: (error) => {
    //     let errorMessage = 'An error occurred during signup';
    //     if (error.error?.message) {
    //       errorMessage = error.error.message;
    //     }
    //     this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
    //     this.isSubmitting = false;
    //   },
    //   complete: () => {
    //     this.isSubmitting = false;
    //   }
    // });
  }
}
