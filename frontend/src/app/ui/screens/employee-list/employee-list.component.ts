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
import { UsersList } from '../../../domain/models/entities/user-list.entitie';

@Component({
    selector: 'employee-list',
    standalone: true,
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.css',
    imports: [CommonModule, InfoCardComponent, EmployeesStaticsComponent, RouterModule, TitleComponent]
})
export class EmployeeListComponent implements OnInit{

  userListService = new UserListUseCaseService(serviceFetcher)
  employeeList: UsersList[] = []
  user!: UserData
  selectedUser?: UsersList
  showWarning: boolean = false
  warningDismissed: boolean = false
  toastMessage: string = ""

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

  async dismissUser() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11, por eso sumamos 1
    const day = String(now.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const response = await this.userListService.dismissUser(this.user!.id.toString(), this.selectedUser!.id.toString(), formattedDate)
    if(response.success) {
      this.showToast("El usuario ha sido retirado de la compañía")
      this.employeeList = []
      this.getUserList()
    }
  }

  selectUser(user: UsersList) {
    this.selectedUser = user
  }

  showToast(message: string, duration: number = 1500) {
    this.showWarning = true;
    this.warningDismissed = false;
    this.toastMessage = message

    setTimeout(() => {
    this.showWarning = false;
    this.warningDismissed = true;
    }, duration);
  }
}
