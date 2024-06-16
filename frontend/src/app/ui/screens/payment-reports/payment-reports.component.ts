import { Component } from '@angular/core';
import { TitleComponent } from "../../shared/components/title/title.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { employee } from '../../../domain/models/employee.interface';

@Component({
    selector: 'app-payment-reports',
    standalone: true,
    templateUrl: './payment-reports.component.html',
    styleUrl: './payment-reports.component.css',
    imports: [TitleComponent, CommonModule, RouterModule]
})
export class PaymentReportsComponent {
    employeeList: employee[] = [
        {
          id: 1,
          name: 'Juan',
          lastName: 'Morelos Acosta',
          identifier: 1065013739,
          position: 'Desarrollador de aplicaciones junior'
        },
        {
          id: 2,
          name: 'Pedro Enrique',
          lastName: 'Perez Pereira',
          identifier: 65123989,
          position: 'Desarrollador web'
        },
        {
          id: 3,
          name: 'Danay',
          lastName: 'Sarmiento Castro',
          identifier: 35765532,
          position: 'Analista QA',
          retirementDate: new Date('23/01/2023')
        },
        {
          id: 4,
          name: 'Andrés',
          lastName: 'Parra Castillo',
          identifier: 89765432,
          position: 'Analista QA'
        },
    ]
}
