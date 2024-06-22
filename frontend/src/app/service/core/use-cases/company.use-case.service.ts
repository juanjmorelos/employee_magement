import { Injectable } from '@angular/core';
import { HttpAdapter } from '../../adapters/http/http.adapter';

interface response {
    message: string,
    success: boolean
}

@Injectable({providedIn: 'root'})
export class CompanyUseCaseService {
    constructor(private fetcher: HttpAdapter) { }

    async updateCompanyData(formData: FormData): Promise<response> {
        try {
            const userResult = await this.fetcher.post<response>('/updateCompanySettings', formData, "multipart/form-data")
            return userResult
        } catch (error) {
            console.log(error)
            throw new Error('Error al actualizar')
        }
    }
    
}