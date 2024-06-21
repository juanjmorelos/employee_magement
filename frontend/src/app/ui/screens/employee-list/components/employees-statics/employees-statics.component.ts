import { Component, Input } from '@angular/core';
import { employee } from '../../../../../domain/models/employee.interface';
import { Users } from '../../../../../domain/models/entities/user-list.entitie';

@Component({
  selector: 'employees-statics',
  standalone: true,
  imports: [],
  templateUrl: './employees-statics.component.html',
  styleUrl: './employees-statics.component.css'
})
export class EmployeesStaticsComponent {
  @Input({ required: true })
  employeeList!: Users[]

  getActiveEmployees() {
    return this.employeeList.filter(employee => employee.retirementDate === null).length
  }
  getRetiredEmployees() {
    return this.employeeList.filter(employee => employee.retirementDate !== null).length
  }
}
