import { Component, Input } from '@angular/core';
import { ReportData } from '../../../../../domain/models/entities/reports.entitie';
import { baseUrl } from '../../../../../service/adapters/service.adapter';
import { Helpers } from '../../../../../domain/helpers/helpers';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'report-detail',
  standalone: true,
  imports: [],
  providers: [DecimalPipe],
  templateUrl: './report-detail.component.html',
  styleUrl: './report-detail.component.css'
})
export class ReportDetailComponent {
  @Input({required: true})
  month: string = ""
  @Input({required: true})
  month_letter: string = ""
  @Input({required: true})
  year: string = ""
  @Input()
  data?: ReportData

  constructor(private decimalPipe: DecimalPipe) {}
  
  getPeriodDay(month: String) {
    if(month === '2') {
      return 28
    }
    return 30;
  }

  getCompanyName() {
    return this.data?.company.name.toUpperCase()
  }

  getCompanyLogo() {
    return baseUrl + this.data?.company.logo
  }

  getFormattedSalary() {
    return Helpers.getFormattedSalary(this.data!.user.salary)
  }

  formatNumber(value: number): string {
    const formattedValue = this.decimalPipe.transform(value, '1.0-0')!;
    return formattedValue.replace(/,/g, '.');
  }
}
