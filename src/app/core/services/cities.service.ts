import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
    private http = inject(HttpClient);

  getCities(countryId: string, provinceId: string){
    return firstValueFrom(
      this.http.post<any[]>(`${environment.apiUrl}/city/filter`, {
        filter: {
          countryId: countryId,
          provinceId: provinceId
        },
        skip: 0,
        limit: 10
      })
    )
  }
}
