import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminService } from '../../services/admin-service.service';
import { Subscription } from 'rxjs';

export interface AuditLog {
  action: string;
  entityName: string;
  entityId: string;
  customerId: number;
  timestamp: string;
  details: string;
}

@Component({
  selector: 'app-audit-logs',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.css']
})
export class AuditLogsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['action', 'entityName', 'entityId', 'customerId', 'timestamp', 'details'];
  dataSource: AuditLog[] = [];
  private auditLogsSubscription!: Subscription;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchAuditLogs();
  }

  fetchAuditLogs(): void {
    this.auditLogsSubscription = this.adminService.getAuditLogs().subscribe({
      next: (data: AuditLog[]) => {
        this.dataSource = data;
      },
      error: (error) => {
        console.error('Failed to fetch audit logs:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.auditLogsSubscription) {
      this.auditLogsSubscription.unsubscribe();
    }
  }
}