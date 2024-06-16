import { Component } from '@angular/core';
import { InfoCardComponent } from "../dashboard/components/info-card/info-card.component";
import { UserFornComponent } from "../dashboard/components/user-forn/user-forn.component";

@Component({
    selector: 'app-employee-register',
    standalone: true,
    templateUrl: './employee-register.component.html',
    styleUrl: './employee-register.component.css',
    imports: [InfoCardComponent, UserFornComponent]
})
export class EmployeeRegisterComponent {

}
