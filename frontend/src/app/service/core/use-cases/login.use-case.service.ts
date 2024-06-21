import { Injectable } from '@angular/core';
import { HttpAdapter } from '../../adapters/http/http.adapter';
import { LoginUserResponse } from '../../../domain/models/entities/user.entitie';

@Injectable({providedIn: 'root'})
export class LoginUseCaseService {
    constructor(private fetcher: HttpAdapter) { }
    
    async loginUser(user: string, password: string): Promise<LoginUserResponse> {
        try {
            const userResult = await this.fetcher.post<LoginUserResponse>('/login', {
                user,
                password
            })
            return userResult
        } catch (error) {
            console.log(error)
            throw new Error('Error al iniciar sesión')
        }
    }
}