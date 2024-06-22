import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../../domain/models/entities/user.entitie';
import { ReportUseCaseService } from '../../../service/core/use-cases/report.use-case.service';
import { baseUrl, serviceFetcher } from '../../../service/adapters/service.adapter';
import { Company } from '../../../domain/models/entities/reports.entitie';
import { CompanyUseCaseService } from '../../../service/core/use-cases/company.use-case.service';

enum ToastType {
  SUCCESS,
  WARNING
}

@Component({
  selector: 'app-company-data',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './company-data.component.html',
  styleUrl: './company-data.component.css'
})
export class CompanyDataComponent {
  password: string = ""
  confirmPassword: string = ""
  showWarning: boolean = false
  warningDismissed: boolean = false
  toastMessage: string = ""
  type: ToastType = ToastType.WARNING

  selectedFile: File | null = null;
  companyName: string = ""
  identifier: string = ""
  companyLogo: string | ArrayBuffer | null = ""
  id: string = ""
  currentUser?: UserData
  reportUseCaseService = new ReportUseCaseService(serviceFetcher)
  companyUseCaseService = new CompanyUseCaseService(serviceFetcher)
  company?: Company

  constructor(private route: ActivatedRoute) {}

    async ngOnInit() {
        const userData = localStorage.getItem('userData');
        this.currentUser = JSON.parse(userData!)
        await this.getReport()
        
    }

    async getReport() {
      const response = await this.reportUseCaseService.getUserPayment(this.currentUser!.id.toString(), this.currentUser!.id.toString())
      if(response.success) {
          this.company = response.data.company
          this.identifier = this.company.identifier.toString()
          this.companyName = this.company.name
          this.companyLogo = baseUrl + this.company?.logo
      }
    }

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.companyLogo = reader.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }

    async updateCompanyData() {
        const formData = new FormData();
        formData.append('name', this.companyName)
        formData.append('identifier', this.identifier)
        formData.append('userId', this.currentUser!.id.toString())
        if(this.selectedFile) {
          formData.append('logo', this.selectedFile)
        }
        const response = await this.companyUseCaseService.updateCompanyData(formData)
        if(response.success) {
          this.showToast("Los datos de la empresa se actualizaron correctamente", 3000, ToastType.SUCCESS)
        } else {
          this.showToast(response.message, 2500)
        }
  
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
