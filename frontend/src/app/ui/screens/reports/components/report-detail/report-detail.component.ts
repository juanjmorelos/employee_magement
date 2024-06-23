import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportData } from '../../../../../domain/models/entities/reports.entitie';
import { baseUrl } from '../../../../../service/adapters/service.adapter';
import { Helpers } from '../../../../../domain/helpers/helpers';
import { DecimalPipe } from '@angular/common';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';


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

  @Output () 
  valueResponse: EventEmitter<HTMLElement> = new EventEmitter();
  
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

  exportPdf() {
    const element = document.getElementById('detail-report');

    if (!element) {
        console.error('Element not found!');
        return;
    }
    console.log(element)
    domtoimage.toPng(element)
      .then((imgData) => {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'letter',
        });

        console.log(imgData)

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const marginTop = 8;  // Adjust the top margin size here
        const marginHorizontal = 5;  // Adjust the horizontal margin size here
        const imgWidth = pdfWidth - 2 * marginHorizontal;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', marginHorizontal, marginTop, imgWidth, imgHeight);

        const pdfBlob = pdf.output('blob');

        // Create a URL for the blob and open it in a new tab
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
}
}
