import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

export const routes: Routes = [
    {path: 'signup', component: SignupComponent},
    {path: '', redirectTo: '/signup', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
];

