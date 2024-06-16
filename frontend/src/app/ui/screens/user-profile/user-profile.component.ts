import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
