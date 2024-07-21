import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'signup', component: SignupComponent},
    //{path: '', redirectTo: '/signup', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    //{path: '', redirectTo: '/login', pathMatch: 'full'},
];

