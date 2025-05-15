 import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
    {path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.routes)},
    {path: 'user', loadChildren: () => import('./user/user.routes').then(m => m.routes)},
    {path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.routes)},
    {path: '**', redirectTo: 'auth/login'}
];
