import { Component, Input } from '@angular/core';

@Component({
  selector: 'report-detail',
  standalone: true,
  imports: [],
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
  
  getPeriodDay(month: String) {
    if(month === '2') {
      return 28
    }
    return 30;
  }
}
