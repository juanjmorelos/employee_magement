import { Component, OnInit } from '@angular/core';
import { InfoCardComponent } from '../dashboard/components/info-card/info-card.component';
import { UserFornComponent } from '../dashboard/components/user-forn/user-forn.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserData } from '../../../domain/models/entities/user.entitie';
import { UserDetailUseCaseService } from '../../../service/core/use-cases/user-detail.use-case.service';
import { serviceFetcher } from '../../../service/adapters/service.adapter';
import { UserDetail } from '../../../domain/models/entities/user-detail.entitie';
import { DialogComponent } from "../../shared/components/dialog/dialog.component";
import { AlertDialog } from '../../uiService/dialog.service';
import { Helpers } from '../../../domain/helpers/helpers';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
    selector: 'app-employee-detail',
    standalone: true,
    templateUrl: './employee-detail.component.html',
    styleUrl: './employee-detail.component.css',
    imports: [InfoCardComponent, UserFornComponent, RouterModule, DialogComponent, CommonModule, FormsModule]
})
export class EmployeeDetailComponent implements OnInit{
  private userToConsult: string = ""
  private userTransact?: UserData
  private userDetailService = new UserDetailUseCaseService(serviceFetcher)
  userDetail?: UserDetail
  loaded: boolean = false
  
  constructor(private route: ActivatedRoute, private alertDialog: AlertDialog, private routes: Router) {}
  
  async ngOnInit(): Promise<void> {
    this.userToConsult = this.route.snapshot.paramMap.get('id') ?? "";
    const userData = localStorage.getItem('userData');
    this.userTransact = JSON.parse(userData!)
    await this.getDetail()
  }

  async getDetail() {
    const response = await this.userDetailService.getUserDetail(this.userTransact!.id.toString(), this.userToConsult)
    if(response.success) {
      this.userDetail = response.data
      this.loaded = true
    } else {
      this.alertDialog.showDialog({
        title: "Detalle de usuario",
        message: response.message,
        buttonText: "Aceptar"
      })
      this.routes.navigate(['home/employee_list']);
    }
  }

  getWorkDays() {
    if(this.loaded) {
      return Helpers.getWorkedTime(this.userDetail!.admissionDate)
    }
    return ""
  }

  getFormattedDate(date: string) {
    if(this.loaded) {
      return Helpers.getFormattedDate(date)
    }
    return ""
  }

  getFormatteSalary() {
    if(this.loaded) {
      return Helpers.getFormattedSalary(this.userDetail!.salary)
    }
    return ""
  }

  getBirthDate() {
    if(this.loaded) {
      const date = new Date(this.userDetail!.birthdate);
      return date.toISOString().substring(0, 10);
    }
    return ""
  }

}
