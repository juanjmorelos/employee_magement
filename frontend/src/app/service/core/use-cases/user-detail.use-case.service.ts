import { Injectable } from '@angular/core';
import { HttpAdapter } from '../../adapters/http/http.adapter';
import { UserDetailResponse } from '../../../domain/models/entities/user-detail.entitie';

@Injectable({
    providedIn: 'root'
})
export class UserDetailUseCaseService {
    constructor(private fetcher: HttpAdapter) { }

    async getUserDetail(transactUser: string, user: string): Promise<UserDetailResponse>{
        try {
            const userResult = await this.fetcher.get<UserDetailResponse>(`/getUserDetail/${transactUser}:${user}`)
            return userResult
        } catch (error) {
            console.log(error)
            throw new Error('Error al obtener los usuarios')
        }
    }
}