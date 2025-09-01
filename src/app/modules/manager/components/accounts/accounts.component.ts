import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ManagerService } from '../../services/manager-service.service';
import { Subscription } from 'rxjs';

export interface Account {
  profileId: number;
  contactId: number;
  username: string;
  email: string;
  accountNumber: string;
  accountType: string;
  kyc: boolean;
  balance: number;
}

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['profileId', 'username', 'email', 'accountNumber', 'accountType', 'balance', 'kyc'];
  dataSource: Account[] = [];
  private accountsSubscription!: Subscription;

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.accountsSubscription = this.managerService.getAllAccounts().subscribe({
      next: (data: Account[]) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Failed to fetch accounts:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.accountsSubscription) {
      this.accountsSubscription.unsubscribe();
    }
  }
}