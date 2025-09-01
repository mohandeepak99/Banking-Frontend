import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerNavComponent } from './components/customer-nav/customer-nav.component';
import { HomeComponentComponent } from '../../home-component/home-component.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransferComponent } from './components/transfer/transfer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerNavComponent,
    children: [
      { path: 'dashboard', component: HomeComponentComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'transfer', component: TransferComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }