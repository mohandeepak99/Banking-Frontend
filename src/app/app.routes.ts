import { Routes } from '@angular/router';
import { LandingComponent } from './auth/components/landing/landing.component';

export const routes: Routes = [
    { path: '', component: LandingComponent, pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent) },
    { path: 'signup', loadComponent: () => import('./auth/components/signup/signup.component').then(m => m.SignupComponent) },
    
    // Lazy-loaded modules for different user roles
    {
      path: 'customer',
      loadChildren: () => import('./modules/customer/customer-routing.module').then(m => m.CustomerRoutingModule),
    },
    {
      path: 'admin',
      loadChildren: () => import('./modules/admin/admin-routing.module').then(m => m.AdminRoutingModule),
    },
    {
      path: 'manager',
      loadChildren: () => import('./modules/manager/manager-routing.module').then(m => m.ManagerRoutingModule),
    },

    // A catch-all route for any undefined paths
    { path: '**', redirectTo: '' }
];