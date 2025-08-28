import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProvincesService {
  private http = inject(HttpClient);

  filterProvinces(filter: any){
    return firstValueFrom(
      this.http.post<any[]>(`${environment.apiUrl}/province/filter`, filter)
    )
  }

  getProvince(_id: string) {
    return firstValueFrom(
      this.http.get<any>(`${environment.apiUrl}/province/${_id}`)
    )
  }

  addProvince(newProvince: any) {
    return firstValueFrom(
      this.http.post<any[]>(`${environment.apiUrl}/province/add`, newProvince)
    )
  }

  updateProvince(_id: string, updatedProvince: any) {
    return firstValueFrom(
      this.http.put<any>(`${environment.apiUrl}/province/${_id}`, updatedProvince)
    )
  }

  deleteProvince(_id: string) {
    return firstValueFrom(
      this.http.delete<any>(`${environment.apiUrl}/province/${_id}`)
    )
  }
}
