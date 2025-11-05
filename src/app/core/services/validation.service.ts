import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private http = inject(HttpClient);

  validateLoggedIn(){
    return firstValueFrom(
      this.http.get<any>(`${environment.apiUrl}/validation/isLogged`)
    )
  }

  validateIsTheSameUser(_id: string){
    return firstValueFrom(
      this.http.get<any>(`${environment.apiUrl}/validation/isSameUser/${_id}`)
    )
  }

  validateAdmin(){
    return firstValueFrom(
      this.http.get<any>(`${environment.apiUrl}/validation/isAdmin`)
    )
  }

  validateModerator(){
    return firstValueFrom(
      this.http.get<any>(`${environment.apiUrl}/validation/isModerator`)
    )
  }

  validateIsOwner(dogId: string){
    return firstValueFrom(
      this.http.get<any>(`${environment.apiUrl}/validation/isOwner/${dogId}`)
    )
  }
}
