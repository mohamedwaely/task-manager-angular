import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { AuthGuard } from './middlewares/authuser';

export const routes: Routes = [
    {path: '', redirectTo: '/register', pathMatch: 'full'},
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    // {path: 'dashboard', component: Dashboard, canActivate: [AuthGuard]},
    {path: 'dashboard', component: Dashboard},
    // {path: '**'}
];
