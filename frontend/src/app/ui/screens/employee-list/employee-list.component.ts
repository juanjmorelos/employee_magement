import { Component, OnInit } from '@angular/core';
import { employee } from '../../../domain/models/employee.interface';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from '../dashboard/components/info-card/info-card.component';
import { EmployeesStaticsComponent } from './components/employees-statics/employees-statics.component';
import { RouterModule } from '@angular/router';
import { TitleComponent } from "../../shared/components/title/title.component";
import { UserListUseCaseService } from '../../../service/core/use-cases/user-list.use-case.service';
import { serviceFetcher } from '../../../service/adapters/service.adapter';
import { UserData } from '../../../domain/models/entities/user.entitie';
import { Users } from '../../../domain/models/entities/user-list.entitie';

@Component({
    selector: 'employee-list',
    standalone: true,
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css',
    imports: [CommonModule, InfoCardComponent, EmployeesStaticsComponent, RouterModule, TitleComponent]
})
export class EmployeeListComponent implements OnInit{

  userListService = new UserListUseCaseService(serviceFetcher)
  employeeList: Users[] = []
  user!: UserData


  constructor() {
    
  }

  async ngOnInit(): Promise<void> {
    const userData = localStorage.getItem('userData');
    this.user = JSON.parse(userData!)
    this.getUserList()
  }

  async getUserList() {
    const response = await this.userListService.getUserList(this.user.id.toString())
    if(response.success) {
      this.employeeList = response.data
      console.log("Si hay usuarios")
    }
  }


  getIsActive(retirementDate: string | null) {
    return retirementDate === null ? 'Activo' : 'Retirado'
  }
}
