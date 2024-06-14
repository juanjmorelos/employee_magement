import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { Router } from '@angular/router';
import { AlertDialog } from '../../../uiService/dialog.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';



@Component({
    selector: 'login-screen',
    standalone: true,
    templateUrl: './login-screen.component.html',
    styleUrl: './login-screen.component.css',
    imports: [FormsModule, CommonModule, FooterComponent, DialogComponent]
})
export class LoginScreenComponent {
  username: string = ""
  password: string = ""
  emptyFields: string[] = []

  constructor(private routes: Router, private alertDialog: AlertDialog) {}

  login() {
    this.emptyFields = []
    if(this.username == "") {
      this.emptyFields.push("username")
    }
    if(this.password == "") {
      this.emptyFields.push("password")
    }
    //TODO: Realizar llamado login
    if(this.emptyFields.length === 0) {
      if(this.username === "admin" && this.password === "admin") {
        this.routes.navigate(["home"])
      } else {
        this.alertDialog.showDialog({
          title: 'Oops',
          message: 'Usuario o contraseña incorrectos, por favor verifica e intenta nuevamente',
          buttonText: 'Aceptar'
        });
      }
    }
  }
}
