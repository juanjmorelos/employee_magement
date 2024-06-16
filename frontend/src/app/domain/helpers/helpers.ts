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
}