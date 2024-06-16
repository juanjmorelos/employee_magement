import { Component } from '@angular/core';
import { employee } from '../../../domain/models/employee.interface';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from '../dashboard/components/info-card/info-card.component';
import { EmployeesStaticsComponent } from './components/employees-statics/employees-statics.component';
import { RouterModule } from '@angular/router';
import { TitleComponent } from "../../shared/components/title/title.component";

@Component({
    selector: 'employee-list',
    standalone: true,
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css',
    imports: [CommonModule, InfoCardComponent, EmployeesStaticsComponent, RouterModule, TitleComponent]
})
export class EmployeeListComponent {
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


  getIsActive(employee: employee) {
    return employee.retirementDate === undefined ? 'Activo' : 'Retirado'
  }
}
