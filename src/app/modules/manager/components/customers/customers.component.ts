import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ManagerService } from '../../services/manager-service.service';
import { Subscription } from 'rxjs';

export interface Customer {
  contactId: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  age: number;
  gender: string;
  kyc: boolean;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['contactId', 'firstName', 'lastName', 'email', 'mobileNumber', 'kyc'];
  dataSource: Customer[] = [];
  private customersSubscription!: Subscription;

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.customersSubscription = this.managerService.getAllCustomers().subscribe({
      next: (data: Customer[]) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Failed to fetch customers:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.customersSubscription) {
      this.customersSubscription.unsubscribe();
    }
  }
}