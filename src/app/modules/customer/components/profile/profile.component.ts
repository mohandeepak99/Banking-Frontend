import { StorageService } from './../../../../auth/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer-service.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private profileSubscription!: Subscription;
  private updateSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      contactId: [''],
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email, Validators.maxLength(150)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      gender: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile(): void {
    this.profileSubscription = this.customerService.getProfile().subscribe({
      next: (data) => {
        this.profileForm.patchValue(data);
      },
      error: (error) => {
        console.error('Failed to fetch profile:', error);
        this.snackBar.open('Failed to load profile data.', 'Close', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.updateSubscription = this.customerService.updateProfile(this.profileForm.getRawValue()).subscribe({
        next: (response) => {
          this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Failed to update profile:', error);
          this.snackBar.open('Failed to update profile.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please correct the form errors.', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar'
      });
    }
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}