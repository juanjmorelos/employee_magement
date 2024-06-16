import { Routes } from '@angular/router';
import { LoginScreenComponent } from './ui/screens/login/login-screen/login-screen.component';
import { HomeScreenComponent } from './ui/screens/home/home-screen.component';
import { DashboardComponent } from './ui/screens/dashboard/dashboard.component';
import { EmployeeListComponent } from './ui/screens/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './ui/screens/employee-detail/employee-detail.component';
import { EmployeeRegisterComponent } from './ui/screens/employee-register/employee-register.component';
import { PaymentRequestComponent } from './ui/screens/payment-request/payment-request.component';
import { PaymentAuthorizationComponent } from './ui/screens/payment-authorization/payment-authorization.component';
import { PaymentReportsComponent } from './ui/screens/payment-reports/payment-reports.component';
import { ReportsComponent } from './ui/screens/reports/reports.component';
import { UserProfileComponent } from './ui/screens/user-profile/user-profile.component';
import { CompanyDataComponent } from './ui/screens/company-data/company-data.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginScreenComponent
    },

    {
        path: "home",
        component: HomeScreenComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', component: DashboardComponent },
            { 
                path: 'employee_list', 
                component: EmployeeListComponent,
                children: [
                    { path: '', redirectTo: 'employee_list', pathMatch: 'full' },
                ]
            },
            { path: 'employee_list/employee/:id', component: EmployeeDetailComponent },
            { path: 'new_employee', component: EmployeeRegisterComponent },
            { path: 'request_payment', component: PaymentRequestComponent },
            { path: 'payment_authorization', component: PaymentAuthorizationComponent },
            { path: 'payment_reports', component: PaymentReportsComponent },
            { 
                path: 'reports', 
                component: ReportsComponent, 
                children: [
                    { path: '', redirectTo: 'reports', pathMatch: 'full' },
                ] 
            },
            { path: 'payment_reports/employee/:id', component: ReportsComponent },
            { path: 'profile', component: UserProfileComponent },
            { path: 'company', component: CompanyDataComponent },
        ]
    }
];
