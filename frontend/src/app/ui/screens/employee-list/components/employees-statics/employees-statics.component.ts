import { Component, Input } from '@angular/core';
import { employee } from '../../../../../domain/models/employee.interface';

@Component({
  selector: 'employees-statics',
  standalone: true,
  imports: [],
  templateUrl: './employees-statics.component.html',
  styleUrl: './employees-statics.component.css'
})
export class EmployeesStaticsComponent {
  @Input({ required: true })
  employeeList!: employee[]

  getActiveEmployees() {
    return this.employeeList.filter(employee => employee.retirementDate === undefined).length
  }
  getRetiredEmployees() {
    return this.employeeList.filter(employee => employee.retirementDate !== undefined).length
  }
}
