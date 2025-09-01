import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuditLogsComponent } from './components/audit-logs/audit-logs.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: AdminNavComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'audit-logs', component: AuditLogsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }