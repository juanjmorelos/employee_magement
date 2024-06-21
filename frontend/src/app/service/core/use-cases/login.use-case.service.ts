import { Injectable } from '@angular/core';
import { HttpAdapter } from '../../adapters/http/http.adapter';
import { User } from '../../../domain/models/entities/user.entitie';

@Injectable({providedIn: 'root'})
export class LoginUseCaseService {
    constructor(private fetcher: HttpAdapter) { }
    
    async loginUser(user: string, password: string): Promise<User> {
        try {
            const userResult = await this.fetcher.post<User>('/login', {
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