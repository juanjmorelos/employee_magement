import { Injectable } from '@angular/core';
import { HttpAdapter } from '../../adapters/http/http.adapter';
import { UserListResponse } from '../../../domain/models/entities/user-list.entitie';
import { UserDetailResponse } from '../../../domain/models/entities/user-detail.entitie';

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

    async dismissUser(transactUser: string, idUser: string, retiredDate: string): Promise<UserDetailResponse> {
        try {
            const userResult = await this.fetcher.put<UserDetailResponse>(`/dismissUser`, {
                transactUser,
                idUser,
                retiredDate
            }, "application/json")
            return userResult
        } catch (error) {
            console.log(error)
            throw new Error('Error al obtener los usuarios')
        }
    }
}