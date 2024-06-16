import { Component } from '@angular/core';
import { TitleComponent } from "../../shared/components/title/title.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportDetailComponent } from "./components/report-detail/report-detail.component";
import { Helpers } from '../../../domain/helpers/helpers';
import { ActivatedRoute } from '@angular/router';


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

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id') ?? "";
     }

    searchPayment() {
        if(this.month != '' && this.year != '') {
            this.showReport = true
            return
        }
        this.showToast(2500)
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
