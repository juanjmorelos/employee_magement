import { Injectable } from '@angular/core';
import { HttpAdapter } from '../../adapters/http/http.adapter';
import { UserListResponse } from '../../../domain/models/entities/user-list.entitie';

@Injectable({providedIn: 'root'})
export class UserListUseCaseService {
    constructor(private fetcher: HttpAdapter) { }
    
    async getUserList(user: string): Promise<UserListResponse> {
        try {
            const userResult = await this.fetcher.get<UserListResponse>(`/allUsers/${user}`)
            return userResult
        } catch (error) {
            console.log(error)
            throw new Error('Error al obtener los usuarios')
        }
    }
}