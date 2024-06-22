import { Injectable } from '@angular/core';
import { HttpAdapter } from '../../adapters/http/http.adapter';
import { ReportsResponse } from '../../../domain/models/entities/reports.entitie';

@Injectable({providedIn: 'root'})
export class ReportUseCaseService {
    constructor(private fetcher: HttpAdapter) { }

    async getUserPayment(transactUser: string, user: string): Promise<ReportsResponse>{
        try {
            const userResult = await this.fetcher.get<ReportsResponse>(`/userPayment/${transactUser}:${user}`)
            return userResult
        } catch (error) {
            console.log(error)
            throw new Error('Error al obtener los usuarios')
        }
    }
    
}