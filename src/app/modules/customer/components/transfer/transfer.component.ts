import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer-service.service';
import { Subscription } from 'rxjs';

export interface PaymentRequest {
  senderAccountNumber: string;
  senderName: string;
  receiverAccountNumber: string;
  receiverName: string;
  amount: number;
}

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit, OnDestroy {
  transferForm: FormGroup;
  private paymentSubscription!: Subscription;
  private userAccountInfo = {
    
    accountNumber: '',
    name: ''
  };

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private customerService: CustomerService) {
    this.transferForm = this.fb.group({
      receiverAccountNumber: ['', [Validators.required, Validators.pattern('^[0-9]{20}$')]],
      receiverName: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }
  

  ngOnInit(): void {

    // Fetch sender’s account info and name
    this.customerService.getAccountsByUser().subscribe({
      next: (accounts) => {
        if (accounts && accounts.length > 0) {
          // pick the first account; adapt if you have multiple
          this.userAccountInfo.accountNumber = accounts[0].accountNumber;
        }
      },
    });
    // Fetch the user's profile to get full name
    this.customerService.getProfile().subscribe({
          next: (profile) => {
            const firstName = profile?.firstName ?? '';
            const lastName = profile?.lastName ?? '';
            this.userAccountInfo.name = `${firstName} ${lastName}`.trim();
          },
    });
   }
   

  onSubmit(): void {
    if (this.transferForm.valid) {
      const request: PaymentRequest = {
        senderAccountNumber: this.userAccountInfo.accountNumber,
        senderName: this.userAccountInfo.name,
        receiverAccountNumber: this.transferForm.value.receiverAccountNumber,
        receiverName: this.transferForm.value.receiverName,
        amount: this.transferForm.value.amount
      };

      this.paymentSubscription = this.customerService.doPayment(request).subscribe({
        next: (response) => {
          this.snackBar.open('Transfer successful!', 'Close', { duration: 3000 });
          this.transferForm.reset();
        },
        error: (error) => {
          console.error('Transfer failed:', error);
          this.snackBar.open('Transfer failed. Please check details and try again.', 'Close', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
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
    if (this.paymentSubscription) {
      this.paymentSubscription.unsubscribe();
    }
  }
}