import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BreedsService {
  private http = inject(HttpClient);

  filterBreeds(filter: any){
    return firstValueFrom(
      this.http.post<any[]>(`${environment.apiUrl}/breed/filter`, filter)
    )
  }

  getBreed(_id: string){
    return firstValueFrom(
        this.http.get<any>(`${environment.apiUrl}/breed/${_id}`)
    )
  }

  addBreed(newBreed: any){
    return firstValueFrom(
      this.http.post<any[]>(`${environment.apiUrl}/breed/add`, newBreed)
    )
  }

  updateBreed(_id: string, updatedBreed: any){
    return firstValueFrom(
      this.http.put<any>(`${environment.apiUrl}/breed/${_id}`, updatedBreed)
    )
  }

  deleteBreed(_id: string){
    return firstValueFrom(
      this.http.delete<any>(`${environment.apiUrl}/breed/${_id}`)
    )
  }

}
