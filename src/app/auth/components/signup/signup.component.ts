import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^(?=[a-zA-Z0-9._%+-]{1,64}@)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=*!?])[A-Za-z\d@#$%^&+=*!?]{8,20}$/)
        ]
      ],
      confirmPassword: [null, [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  // Validator to check if password and confirmPassword match
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  get passwordMismatchError(): boolean {
    return (
      this.signupForm.hasError('passwordsMismatch') &&
      ((this.signupForm.get('confirmPassword')?.touched ?? false) ||
        (this.signupForm.get('password')?.touched ?? false))
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;
      this.authService.signup(signupData).subscribe({
        next: (res) => {
          this.snackbar.open('Signup Successful! Please login.', 'Close', { duration: 5000, panelClass: ['mat-toolbar', 'mat-primary'] });
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.error(err);
          this.snackbar.open('An error occurred. Try again.', 'Close', { duration: 5000, panelClass: ['mat-toolbar', 'mat-warn'] });
        }
      });
    }
  }
}
