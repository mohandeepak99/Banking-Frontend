import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    // You could add logic here to check if the user is already logged in
    // and redirect them to their respective dashboard.
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response) {
            this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
            // The role-based navigation logic has been moved here
            if (response.userRole === 'ADMIN') {
              this.router.navigate(['/admin/dashboard']);
            } else if (response.userRole === 'MANAGER') {
              this.router.navigate(['/manager/dashboard']);
            } else if (response.userRole === 'CUSTOMER') {
              this.router.navigate(['/customer/dashboard']);
            }
          } else {
            this.snackBar.open('Login failed. Please check your credentials.', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
          }
        },
        error: (err) => {
          this.snackBar.open(err.error || 'Login failed. Please check your credentials.', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
        }
      });
    }
  }
}