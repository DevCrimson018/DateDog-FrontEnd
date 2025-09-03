import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment.prod';
import { shortUserProjection } from '../models/short-projections';
import { userProjection } from '../models/projections';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);

  filterUsers(filter: any) {
    return firstValueFrom(
      this.http.post<shortUserProjection[]>(`${environment.apiUrl}/user/filter`, filter)
    )
  }

  getUser(_id: string) {
    return firstValueFrom(
      this.http.get<userProjection>(`${environment.apiUrl}/user/${_id}`)
    )
  }

  updateUser(_id: string, updatedUser: any) {
    return firstValueFrom(
      this.http.put<any>(`${environment.apiUrl}/user/${_id}`, updatedUser)
    )
  }

  deleteUser(_id: string) {
    return firstValueFrom(
      this.http.delete<any>(`${environment.apiUrl}/user/${_id}`)
    )
  }
}
