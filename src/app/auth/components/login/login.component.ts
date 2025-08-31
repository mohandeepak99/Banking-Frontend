import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (res) => {
          if (res.userId != null) {
            const user = {
              userId: res.userId,
              userRole: res.userRole
            };
            StorageService.saveUser(user);
            StorageService.saveToken(res.jwt);

            if (StorageService.isAdminLoggedIn() || StorageService.isManagerLoggedIn()) {
              this.router.navigate(['/admin/dashboard']);
            } else if (StorageService.isCustomerLoggedIn()) {
              this.router.navigate(['/customer/dashboard']);
            }
            this.snackbar.open('Login Successful', 'Close', { duration: 5000 });
          } else {
            this.snackbar.open('Login failed. Invalid credentials', 'Close', { duration: 5000, panelClass: ['mat-toolbar', 'mat-warn'] });
          }
        },
        error: (err) => {
          console.error(err);
          this.snackbar.open('An error occurred. Try again.', 'Close', { duration: 5000, panelClass: ['mat-toolbar', 'mat-warn'] });
        }
      });
    }
  }
}
