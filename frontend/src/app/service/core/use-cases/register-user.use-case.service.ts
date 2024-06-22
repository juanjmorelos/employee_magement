import { Injectable } from '@angular/core';
import { HttpAdapter } from '../../adapters/http/http.adapter';
import { UserUpdate } from '../../../domain/models/entities/user-register.entitie';

interface response {
    message: string,
    success: boolean
}

@Injectable({providedIn: 'root'})
export class RegisterUserUseCaseService {
    
    constructor(private fetcher: HttpAdapter) { 
        
    }

    async registerUser(user: UserUpdate): Promise<response> {
        try {
            const userResult = await this.fetcher.post<response>('/registerUser', user, "application/json")
            return userResult
        } catch (error) {
            console.log(error)
            throw new Error('Error al registrar usuario')
        }
    }
    
}