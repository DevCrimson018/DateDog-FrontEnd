import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);

  filterUsers(filter: any) {
    return firstValueFrom(
      this.http.post<any[]>(`${environment.apiUrl}/user/filter`, filter)
    )
  }

  getUser(_id: string) {
    return firstValueFrom(
      this.http.get<any>(`${environment.apiUrl}/user/${_id}`)
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
