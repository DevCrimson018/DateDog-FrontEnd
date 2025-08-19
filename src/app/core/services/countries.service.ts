import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  
  private http = inject(HttpClient);

  getCountries(){
    return firstValueFrom(
      this.http.get(`${environment.apiUrl}/country`)
    )
  }

}
