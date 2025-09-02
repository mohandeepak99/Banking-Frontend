import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CustomerService } from '../modules/customer/services/customer-service.service';
import { CommonModule, DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatListModule,DecimalPipe,DatePipe,NgIf,NgFor,CommonModule],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent implements OnInit {
  totalBalance: number = 0;
  recentTransactions: any[] = [];
  userName: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    // Fetch accounts for the logged-in user and compute total balance
    this.customerService.getAccountsByUser().subscribe({
      next: (accounts) => {
        if (accounts && accounts.length > 0) {
          const account = accounts[0];
          this.totalBalance = Number(account.balance ?? 0);
        }
      },
    });
    // Fetch recent transactions (limit to 5)
    this.customerService.getTransactions().subscribe({
      next: (txs) => {
        this.recentTransactions = (txs || []).slice(0, 5);
      },
    });
    // Fetch profile to get user name
    this.customerService.getProfile().subscribe({
      next: (profile) => {
        const firstName = profile?.firstName ?? '';
        const lastName = profile?.lastName ?? '';
        this.userName = `${firstName} ${lastName}`.trim();
      },
    });
  }
}