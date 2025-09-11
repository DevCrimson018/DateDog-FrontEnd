import { Component, inject } from '@angular/core';
import { DogsService } from '../../../core/services/dogs.service';
import { filterDogs } from '../../../core/models/filters';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  
  nearbyDogs:any[] = [];

  // Estado del mapa
  showMapView = false;
  selectedDog: any = null;
  
  private dogService = inject(DogsService);

  async ngOnInit() {
    // Aquí iría la lógica para obtener la ubicación real del usuario
    await this.getNearByDogs()
  }

  async getNearByDogs() {
    // Lógica de filtrado (simplificada)
    try {
      this.nearbyDogs = await this.dogService.nearByDogs(filterDogs({}, 0, 10));
      console.log(this.nearbyDogs);
      
    } catch (error) {
      console.log(error);
    }
  }
}