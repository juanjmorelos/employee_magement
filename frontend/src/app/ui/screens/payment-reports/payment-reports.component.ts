import { Component } from '@angular/core';
import { TitleComponent } from "../../shared/components/title/title.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { employee } from '../../../domain/models/employee.interface';
import { UsersList } from '../../../domain/models/entities/user-list.entitie';
import { UserData } from '../../../domain/models/entities/user.entitie';
import { UserListUseCaseService } from '../../../service/core/use-cases/user-list.use-case.service';
import { serviceFetcher } from '../../../service/adapters/service.adapter';
import { Helpers } from '../../../domain/helpers/helpers';

@Component({
    selector: 'app-payment-reports',
    standalone: true,
    templateUrl: './payment-reports.component.html',
    styleUrl: './payment-reports.component.css',
    imports: [TitleComponent, CommonModule, RouterModule]
})
export class PaymentReportsComponent {
    employeeList: UsersList[] = []
    user!: UserData
    userListService = new UserListUseCaseService(serviceFetcher)
    totalPayment: number = 0
    formatedPayment: string = ""
    month = ""

    async ngOnInit(): Promise<void> {
      const userData = localStorage.getItem('userData');
      this.user = JSON.parse(userData!)
      await this.getUserList()
      this.getTotalPayment()
    }
  
    async getUserList() {
      const response = await this.userListService.getUserList(this.user.id.toString())
      if(response.success) {
        this.employeeList = response.data
      }
    }

    getTotalPayment() {
      if(this.employeeList.length > 0) {
        for (let i = 0; i < this.employeeList.length; i++) {
          const item = this.employeeList[i];
          if(item.retirementDate == null) {
            this.totalPayment += parseInt(item.salary)
          }
        }
      }
      this.formatedPayment = Helpers.getFormattedSalary(this.totalPayment)
    }

    obtenerMesActual(): string {
      const now = new Date();
      return Helpers.getMonthByNumber(now.getMonth() + 1).toLowerCase();
    }

    formatTotalPayment() {
      return 
    }
}
