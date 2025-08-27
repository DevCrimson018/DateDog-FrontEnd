import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  
  
  private http = inject(HttpClient);

  logIn(credentials: any){
    return firstValueFrom(
      this.http.post(`${environment.apiUrl}/credential/login`, credentials)
    )
  }
  
  register(newUser: any){
    return firstValueFrom(
      this.http.post(`${environment.apiUrl}/credential/register`, newUser)
    )
  }
}
