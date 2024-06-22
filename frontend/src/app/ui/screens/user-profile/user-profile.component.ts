import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserData } from '../../../domain/models/entities/user.entitie';
import { UpdateUserUSeCaseService } from '../../../service/core/use-cases/update-user.use-case.service';
import { serviceFetcher } from '../../../service/adapters/service.adapter';

enum ToastType {
  SUCCESS,
  WARNING
}

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  password: string = ""
  confirmPassword: string = ""
  showWarning: boolean = false
  warningDismissed: boolean = false
  toastMessage: string = ""
  type: ToastType = ToastType.WARNING
  currentEmail: string = ""

  currentUser?: UserData
  updateUserUseCase = new UpdateUserUSeCaseService(serviceFetcher)

  async ngOnInit() {
    const userData = localStorage.getItem('userData');
    this.currentUser = JSON.parse(userData!)
    this.currentEmail = this.currentUser!.email
  }

  changePassword() {
    if(this.password != "" && this.confirmPassword != "") {
      if(this.password != this.confirmPassword) {
        this.showToast("Las contraseñas no coinciden", 3000)
        return
      }
      this.password = ""
      this.confirmPassword = ""
      this.showToast("La contraseña se cambió exitosamente", 3000, ToastType.SUCCESS  )
      return
    }
    this.showToast("Por favor ingrese su nueva contraseña y confirmela", 3000)
  }

  async updateData() {
    const response = await this.updateUserUseCase.updateUserEmail(this.currentUser!.id.toString(), this.currentEmail)
    if(response.success) {
      localStorage.removeItem('userData')
      localStorage.setItem('userData', JSON.stringify(response.data))
      this.showToast("Email personal actualizado exitosamente", 2000, ToastType.SUCCESS)
      return
    }
    this.showToast(response.message, 2000)
  }

  showToast(message: string, duration: number = 1500, type: ToastType = ToastType.WARNING) {
    this.showWarning = true;
    this.warningDismissed = false;
    this.toastMessage = message
    this.type = type

    setTimeout(() => {
    this.showWarning = false;
    this.warningDismissed = true;
    }, duration);
  }

  typeSuccess() {
    return this.type === ToastType.SUCCESS
  }
  typeWarning() {
    return this.type === ToastType.WARNING
  }
}
