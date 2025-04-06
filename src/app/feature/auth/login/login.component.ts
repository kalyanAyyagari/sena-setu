import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    // this.apiService.login(this.loginForm.value).subscribe({
    //   next: (response) => {
    //     this.storageService.setToken(response.token);
    //     this.storageService.setUser(response.user);
    //     this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
    //     this.router.navigate(['/home']);
    //   },
    //   error: (error) => {
    //     let errorMessage = 'An error occurred during login';
    //     if (error.error?.message) {
    //       errorMessage = error.error.message;
    //     }
    //     this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
    //   },
    //   complete: () => {
    //     this.isSubmitting = false;
    //   }
    // });
  }
}
