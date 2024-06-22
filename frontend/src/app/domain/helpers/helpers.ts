import { differenceInYears, differenceInMonths, addYears } from 'date-fns';
export class Helpers {
    public static getMonthByNumber(monthNumber: number): string {
        const months = [
            'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
            'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
        ];
    
        if (monthNumber < 1 || monthNumber > 12) {
            throw new Error('Número de mes inválido');
        }
    
        return months[monthNumber - 1];
    }

    static getWorkedTime(admissionDate: string, retiredDate: string = "") {
        const actualDate = retiredDate != "" ? new Date(retiredDate) : new Date();
        const admisionedDate = new Date(admissionDate);
        let totalMonthsDiff = differenceInMonths(actualDate, admisionedDate);
        const yearsWorked = totalMonthsDiff / 12;
        const remainingMonths = totalMonthsDiff % 12;
        const periodWorked = `${yearsWorked.toFixed(0)} años, ${remainingMonths} meses`;
        return periodWorked;
    }
    
  
    static getFormattedSalary(salary: number) {
      const number = salary;
      const formattedNumber = '$' + number.toLocaleString('en-US');
      return formattedNumber
    }
  
    static getFormattedDate(date: string) {
      const admisionedDate = new Date(date);
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
      const formattedDate = new Intl.DateTimeFormat('es-CO', options).format(admisionedDate);
      return formattedDate
    }
}