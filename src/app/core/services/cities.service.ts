import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment.prod';
import { shortCityProjection } from '../models/short-projections';
import { cityProjection } from '../models/projections';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
    private http = inject(HttpClient);

  filterCities(filter: any){
    return firstValueFrom(
      this.http.post<shortCityProjection[]>(`${environment.apiUrl}/city/filter`, filter)
    )
  }

  getCity(_id: string) {
    return firstValueFrom(
      this.http.get<cityProjection>(`${environment.apiUrl}/city/${_id}`)
    )
  }

  addCity(newCity: any) {
    return firstValueFrom(
      this.http.post<any[]>(`${environment.apiUrl}/city/add`, newCity)
    )
  }

  updateCity(_id: string, updatedCity: any) {
    return firstValueFrom(
      this.http.put<any>(`${environment.apiUrl}/city/${_id}`, updatedCity)
    )
  }

  deleteCity(_id: string) {
    return firstValueFrom(
      this.http.delete<any>(`${environment.apiUrl}/city/${_id}`)
    )
  }

}
