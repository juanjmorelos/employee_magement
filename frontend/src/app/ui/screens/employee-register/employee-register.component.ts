import { Component } from '@angular/core';
import { InfoCardComponent } from "../dashboard/components/info-card/info-card.component";
import { UserFornComponent } from "../dashboard/components/user-forn/user-forn.component";
import { FormsModule } from '@angular/forms';
import { RegisterUserUseCaseService } from '../../../service/core/use-cases/register-user.use-case.service';
import { serviceFetcher } from '../../../service/adapters/service.adapter';
import { UserData } from '../../../domain/models/entities/user.entitie';
import { CommonModule } from '@angular/common';
import { UserUpdate } from '../../../domain/models/entities/user-register.entitie';

enum ToastType {
    SUCCESS,
    WARNING
}

@Component({
    selector: 'app-employee-register',
    standalone: true,
    templateUrl: './employee-register.component.html',
    styleUrl: './employee-register.component.css',
    imports: [InfoCardComponent, UserFornComponent, FormsModule, CommonModule]
})
export class EmployeeRegisterComponent {
    arlInsurance: string = "";
    birthdate: string = "";
    cesantias: string = "";
    company: string = "";
    email: string = "";
    healthyInsurance: string = "";
    identifier: string = "";
    lastName: string = "";
    name: string = "";
    pension: string = "";
    position: string = "";
    privileges: string = "";
    salary: string = "";
    username: string = "";
    password: string = ""
    account: string = ""

    private registerUseCase = new RegisterUserUseCaseService(serviceFetcher)
    private userTransact?: UserData

    showWarning: boolean = false
    warningDismissed: boolean = false
    toastMessage: string = ""
    private type: ToastType = ToastType.WARNING

    async ngOnInit(): Promise<void> {
        const userData = localStorage.getItem('userData');
        this.userTransact = JSON.parse(userData!)
        this.company = this.userTransact!.companyName
    }

    async regiterUser() {
        const user = {
            arlInsurance: this.arlInsurance,
            birthdate: this.birthdate,
            cesantias: this.cesantias,
            company: this.company,
            email: this.email,
            healthyInsurance: this.healthyInsurance,
            identifier: this.identifier,
            lastName: this.lastName,
            name: this.name,
            pension: this.pension,
            position: this.position,
            privileges: this.privileges,
            salary: this.salary,
            username: this.username,
            password: this.password,
            transactUser: this.userTransact!.id.toString(),
            account: this.account
        }
        if(this.validateFields(user)) {
            const response = await this.registerUseCase.registerUser(user)
            if(response.success) {
                this.showToast("Usuario registrado exitosamente", 2500, ToastType.SUCCESS)
                this.arlInsurance = "";
                this.birthdate = "";
                this.cesantias = "";
                this.company = "";
                this.email = "";
                this.healthyInsurance = "";
                this.identifier = "";
                this.lastName = "";
                this.name = "";
                this.pension = "";
                this.position = "";
                this.privileges = "";
                this.salary = "";
                this.username = "";
                this.password = ""
                this.account = ""
            }
        } else {
            this.showToast("Por favor llene todos campos", 2500)
        }
    }

    private validateFields(user: UserUpdate): boolean {
        for (let key in user) {
            if (user.hasOwnProperty(key) && (user[key as keyof UserUpdate] === "" || user[key as keyof UserUpdate] === null || user[key as keyof UserUpdate] === undefined)) {
                console.log(key)
                return false;
            }
        }
        return true;
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

    getArlData() {
        return [
            {
                value: "1",
                label: "Sura"
            },
            {
                value: "2",
                label: "Seguros bolívar"
            },
            {
                value: "3",
                label: "Positiva"
            }
        ]
    }

    getPensionData() {
        return [
            {
                value: "1",
                label: "Protección"
            },
            {
                value: "2",
                label: "Colpensiones"
            },
        ]
    }
    getCesantiasData() {
        return [
            {
                value: "1",
                label: "Protección"
            },
            {
                value: "2",
                label: "Colpensiones"
            },
        ]
    }

    getHelathyInsuranceData() {
        return [
            {
                value: "1",
                label: "Mutualser"
            },
            {
                value: "2",
                label: "Sura"
            },
            {
                value: "3",
                label: "Colsanitas"
            },
            {
                value: "4",
                label: "Nueva eps"
            }
        ]
    }

    getPositions() {
        return [
            {
                value: 1,
                label: "Desarrollador móvil"
            },
            {
                value: 2,
                label: "Desarrollador web"
            },
            {
                value: 3,
                label: "Desarrollador backend (servicios)"
            },
            {
                value: 4,
                label: "Desarrollador backend (DB admin)"
            },
            {
                value: 5,
                label: "Analista QA"
            },
            {
                value: 6,
                label: "Desarrollador full stack"
            }
        ]
    }
}
