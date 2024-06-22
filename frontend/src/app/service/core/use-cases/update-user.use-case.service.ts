import { Injectable } from '@angular/core';
import { HttpAdapter } from '../../adapters/http/http.adapter';
import { LoginUserResponse } from '../../../domain/models/entities/user.entitie';

interface response {
    message: string,
    success: boolean
}

@Injectable({providedIn: 'root'})
export class UpdateUserUSeCaseService {
    constructor(private fetcher: HttpAdapter) { }
    
    async updateUserEmail(userId: string, email: string): Promise<LoginUserResponse> {
        try {
            const userResult = await this.fetcher.put<LoginUserResponse>('/updateEmail', {
                userId,
                email
            }, "application/json")
            return userResult
        } catch (error) {
            console.log(error)
            throw new Error('Error al actualizar email de usuario')
        }
    }
    async updateUserPassword(userId: string, password: string): Promise<response> {
        try {
            const userResult = await this.fetcher.put<response>('/updatePassword', {
                userId,
                password
            }, "application/json")
            return userResult
        } catch (error) {
            console.log(error)
            throw new Error('Error al actualizar password de usuario')
        }
    }
    
}