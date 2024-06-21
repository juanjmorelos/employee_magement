import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { Router } from '@angular/router';
import { AlertDialog } from '../../../uiService/dialog.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { LoginUseCaseService } from '../../../../service/core/use-cases/login.use-case.service';
import { serviceFetcher } from '../../../../service/adapters/service.adapter';



@Component({
    selector: 'login-screen',
    standalone: true,
    templateUrl: './login-screen.component.html',
    styleUrl: './login-screen.component.css',
    imports: [FormsModule, CommonModule, FooterComponent, DialogComponent]
})
export class LoginScreenComponent implements OnInit{
  username: string = ""
  password: string = ""
  emptyFields: string[] = []
  loginService = new LoginUseCaseService(serviceFetcher)

  constructor(private routes: Router, private alertDialog: AlertDialog) {}
  
  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.routes.navigate(['home/dashboard']);
    }
  }

  async login() {
    this.emptyFields = []
    if(this.username == "") {
      this.emptyFields.push("username")
    }
    if(this.password == "") {
      this.emptyFields.push("password")
    }
    //TODO: Realizar llamado login
    if(this.emptyFields.length === 0) {
      const response = await this.loginService.loginUser(this.username, this.password)
      if(response.success) {
        localStorage.setItem('userData', JSON.stringify(response.data))
        this.routes.navigate(["home"])
      } else {
        this.alertDialog.showDialog({
          title: "Inicio de sesión",
          message: response.message,
          buttonText: "Aceptar"
        })
      }
    }
  }
}
