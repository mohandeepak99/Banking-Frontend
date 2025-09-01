import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomerService } from '../../services/customer-service.service';
import { Subscription } from 'rxjs';

export interface Transaction {
  paymentId: number;
  senderAccountNumber: string;
  receiverAccountNumber: string;
  amount: number;
  paymentTime: string;
  paymentStatus: 'DONE' | 'FAILED' | 'PENDING';
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['paymentId', 'senderAccountNumber', 'receiverAccountNumber', 'amount', 'paymentTime', 'paymentStatus'];
  dataSource: Transaction[] = [];
  private transactionsSubscription!: Subscription;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.transactionsSubscription = this.customerService.getTransactions().subscribe({
      next: (data: Transaction[]) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Failed to fetch transactions:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.transactionsSubscription) {
      this.transactionsSubscription.unsubscribe();
    }
  }
}