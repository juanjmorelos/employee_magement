import { Component } from '@angular/core';
import { TitleComponent } from "../../shared/components/title/title.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportDetailComponent } from "./components/report-detail/report-detail.component";
import { Helpers } from '../../../domain/helpers/helpers';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../../domain/models/entities/user.entitie';
import { ReportUseCaseService } from '../../../service/core/use-cases/report.use-case.service';
import { serviceFetcher } from '../../../service/adapters/service.adapter';
import { ReportData, UserReportData } from '../../../domain/models/entities/reports.entitie';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';


@Component({
    selector: 'app-reports',
    standalone: true,
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.css',
    imports: [TitleComponent, FormsModule, CommonModule, ReportDetailComponent]
})
export class ReportsComponent {
    month: string = ""
    year: string = ""
    showWarning: boolean = false
    warningDismissed: boolean = false
    showReport: boolean = false;
    id: string = "";
    currentUser?: UserData
    reportUseCaseService = new ReportUseCaseService(serviceFetcher)
    report?: ReportData
    userReport?: UserReportData

    constructor(private route: ActivatedRoute) {}

    async ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id') ?? "";
        const userData = localStorage.getItem('userData');
        this.currentUser = JSON.parse(userData!)
        if(this.id != "") {
            await this.getReport()
        }
    }

    async getReport() {
        const response = await this.reportUseCaseService.getUserPayment(this.currentUser!.id.toLocaleString(), this.id)
        if(response.success) {
            this.userReport = response.data.user
        }
    }

    async searchPayment() {
        const userToConsult = this.id == "" ? this.currentUser!.id.toString() : this.id
        if(this.month != '' && this.year != '') {
            const response = await this.reportUseCaseService.getUserPayment(this.currentUser!.id.toLocaleString(), userToConsult)
            if(response.success) {
                this.report = response.data
                this.showReport = true
            }
            return
        }
        this.showToast(2500)
    }

    exportPdf() {
        const element = document.getElementById('report-detail');

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
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('report.pdf');
          })
          .catch((error) => {
            console.error('Error generating PDF:', error);
          });
    }

    showToast(duration: number = 1500) {
        this.showWarning = true;
        this.warningDismissed = false;

        setTimeout(() => {
        this.showWarning = false;
        this.warningDismissed = true;
        }, duration);
    }

    resetReport() {
        this.showReport = false
    }

    getMonth(month: string) {
        let monthNumber = parseInt(month)
        return  Helpers.getMonthByNumber(monthNumber)
    }

}
