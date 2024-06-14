import { Routes } from '@angular/router';
import { LoginScreenComponent } from './ui/screens/login/login-screen/login-screen.component';
import { HomeScreenComponent } from './ui/screens/home/home-screen/home-screen.component';
import { DashboardComponent } from './ui/screens/administrator/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginScreenComponent
    },

    {
        path: "home",
        component: HomeScreenComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
        ]
    }
];
