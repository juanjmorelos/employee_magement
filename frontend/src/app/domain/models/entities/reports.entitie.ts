export interface ReportsResponse {
    data:    ReportData;
    message: string;
    success: boolean;
}

export interface ReportData {
    company:    Company;
    salaryData: SalaryData;
    user:       UserReportData;
}

export interface Company {
    id:         number;
    identifier: number;
    logo:       string;
    name:       string;
}

export interface SalaryData {
    discount:              number;
    healthValue:           number;
    netSalary:             number;
    pensionValue:          number;
    transportContribution?: number;
}

export interface UserReportData {
    account:      number;
    company:      number;
    email:        string;
    id:           number;
    identifier:   number;
    isActive:     number;
    lastName:     string;
    name:         string;
    positionName: string;
    privileges:   number;
    salary:       number;
}
