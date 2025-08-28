import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  
  private http = inject(HttpClient);

  filterCountries(){
    return firstValueFrom(
      this.http.get<any[]>(`${environment.apiUrl}/country`)
    )
  }

  getCountry(_id: string) {
    return firstValueFrom(
      this.http.get<any>(`${environment.apiUrl}/country/${_id}`)
    )
  }

  addCountry(newCountry: any) {
    return firstValueFrom(
      this.http.post<any[]>(`${environment.apiUrl}/country/add`, newCountry)
    )
  }

  updateCountry(_id: string, updatedCountry: any) {
    return firstValueFrom(
      this.http.put<any>(`${environment.apiUrl}/country/${_id}`, updatedCountry)
    )
  }

  deleteCountry(_id: string) {
    return firstValueFrom(
      this.http.delete<any>(`${environment.apiUrl}/country/${_id}`)
    )
  }

}
