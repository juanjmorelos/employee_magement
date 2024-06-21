import { Component } from '@angular/core';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { UserFornComponent } from './components/user-forn/user-forn.component';
import { UserData as User } from '../../../domain/models/entities/user.entitie';
import { differenceInYears, differenceInMonths, addYears } from 'date-fns';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InfoCardComponent, UserFornComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user!: User

  constructor() {
    const userData = localStorage.getItem('userData');
    this.user = JSON.parse(userData!)
    console.log(this.user.salary)
  }

  getWorkedTime() {
      const actualDate = new Date();
      const admisionedDate = new Date(this.user.admissionDate);
      let totalMonthsDiff = differenceInMonths(actualDate, admisionedDate);
      const yearsWorked = totalMonthsDiff / 12;
      const remainingMonths = totalMonthsDiff % 12;
      const periodWorked = `${yearsWorked.toFixed(0)} años, ${remainingMonths} meses`;
      return periodWorked;
  }
  

  getFormattedSalary() {
    const number = this.user.salary;
    const formattedNumber = '$' + number.toLocaleString('en-US');
    return formattedNumber
  }

  getFormattedDate(date: string) {
    const admisionedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('es-CO', options).format(admisionedDate);
    return formattedDate
  }
}
