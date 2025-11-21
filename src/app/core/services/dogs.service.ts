import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment.prod';
import { dogProjection } from '../models/projections';

@Injectable({
  providedIn: 'root'
})
export class DogsService {
  private http = inject(HttpClient);

  filterDogs(filter: any) {
    return firstValueFrom(
      this.http.post<dogProjection[]>(`${environment.apiUrl}/dog/filter`, filter)
    )
  }

  nearByDogs(filter: any) {
    return firstValueFrom(
      this.http.post<dogProjection[]>(`${environment.apiUrl}/dog/nearByDogs`, filter)
    )
  }


  getDog(_id: string) {
    return firstValueFrom(
      this.http.get<dogProjection>(`${environment.apiUrl}/dog/${_id}`)
    )
  }

  addDog(newDog: any) {
    return firstValueFrom(
      this.http.post<any>(`${environment.apiUrl}/dog/add`, newDog)
    )
  }

  updateDog(_id: string, updatedDog: any) {
    return firstValueFrom(
      this.http.put<any>(`${environment.apiUrl}/dog/${_id}`, updatedDog)
    )
  }

  deleteDog(_id: string) {
    return firstValueFrom(
      this.http.delete<any>(`${environment.apiUrl}/dog/${_id}`)
    )
  }
}
