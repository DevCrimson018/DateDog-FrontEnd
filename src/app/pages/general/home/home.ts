import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  token: any 
  nearbyDogs:any[] = [];

  // Estado del mapa
  showMapView = false;
  selectedDog: any = null;

  

  ngOnInit() {
    // Aquí iría la lógica para obtener la ubicación real del usuario
    console.log(this.token);
    
  }

  filterDogs() {
    // Lógica de filtrado (simplificada)
    
  }
}