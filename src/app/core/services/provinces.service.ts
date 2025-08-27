import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProvincesService {
  private http = inject(HttpClient);

  getProvinces(countryId: string){
    return firstValueFrom(
      this.http.post<any[]>(`${environment.apiUrl}/province/filter`, {
        filter: {
          countryId: countryId
        },
        skip: 0,
        limit: 10
      })
    )
  }
}
