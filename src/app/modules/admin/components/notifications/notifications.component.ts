import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../services/admin-service.service';
import { Subscription } from 'rxjs';

export interface Notification {
  id: number;
  recipient: string;
  message: string;
  sentAt: string;
  status: 'SENT' | 'FAILED';
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'recipient', 'message', 'sentAt', 'status'];
  dataSource: Notification[] = [];
  private notificationsSubscription!: Subscription;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  fetchNotifications(): void {
    this.notificationsSubscription = this.adminService.getNotifications().subscribe({
      next: (data: Notification[]) => {
        this.dataSource = data;
      },
      error: (error: any) => { // Corrected: Explicitly typed 'error' as 'any'
        console.error('Failed to fetch notifications:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.notificationsSubscription) {
      this.notificationsSubscription.unsubscribe();
    }
  }
}