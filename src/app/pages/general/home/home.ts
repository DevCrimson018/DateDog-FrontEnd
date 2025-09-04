import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  // Filtros
  filters = {
    distance: 5, // km
    breed: '',
    size: '',
    gender: '',
    activity: ''
  };

  // Opciones de filtros
  breedOptions = ['Labrador', 'Poodle', 'Bulldog', 'Pastor Alemán', 'Chihuahua', 'Golden Retriever', 'Mixed'];
  sizeOptions = ['Pequeño', 'Mediano', 'Grande'];
  genderOptions = ['Macho', 'Hembra'];
  activityOptions = ['Juguetón', 'Tranquilo', 'Activo', 'Senior'];

  // Perros cercanos (datos de ejemplo)
  nearbyDogs = [
    {
      id: 1,
      name: 'Max',
      breed: 'Golden Retriever',
      age: 3,
      gender: 'Macho',
      size: 'Grande',
      distance: 0.8, // km
      location: 'Parque Mirador Sur',
      owner: {
        name: 'Carlos Rodríguez',
        photo: 'assets/users/carlos.jpg',
        rating: 4.8
      },
      photos: ['assets/dogs/max1.jpg'],
      description: 'Amigable y juguetón. Le encanta correr en el parque.',
      lastActive: 'Hace 15 min',
      isOnline: true
    },
    {
      id: 2,
      name: 'Luna',
      breed: 'Husky',
      age: 2,
      gender: 'Hembra',
      size: 'Mediano',
      distance: 1.2,
      location: 'Café Canino',
      owner: {
        name: 'María García',
        photo: 'assets/users/maria.jpg',
        rating: 4.9
      },
      photos: ['assets/dogs/luna1.jpg'],
      description: 'Energética y curiosa. Busca amigos para paseos matutinos.',
      lastActive: 'Hace 30 min',
      isOnline: true
    },
    {
      id: 3,
      name: 'Rocky',
      breed: 'Bulldog',
      age: 4,
      gender: 'Macho',
      size: 'Mediano',
      distance: 2.5,
      location: 'Zona Colonial',
      owner: {
        name: 'Juan Pérez',
        photo: 'assets/users/juan.jpg',
        rating: 4.7
      },
      photos: ['assets/dogs/rocky1.jpg'],
      description: 'Tranquilo y amable. Perfecto para encuentros relajados.',
      lastActive: 'Hace 1 hora',
      isOnline: false
    },
    {
      id: 4,
      name: 'Bella',
      breed: 'Labrador',
      age: 5,
      gender: 'Hembra',
      size: 'Grande',
      distance: 0.5,
      location: 'Playa Dog-Friendly',
      owner: {
        name: 'Ana Martínez',
        photo: 'assets/users/ana.jpg',
        rating: 4.9
      },
      photos: ['assets/dogs/bella1.jpg'],
      description: 'Adora el agua y jugar con pelotas. ¡Siempre lista para divertirse!',
      lastActive: 'Hace 5 min',
      isOnline: true
    }
  ];

  // Estado del mapa
  showMapView = false;
  selectedDog: any = null;

  ngOnInit() {
    // Aquí iría la lógica para obtener la ubicación real del usuario
    this.getUserLocation();
  }

  getUserLocation() {
    // Simulación - en una app real usarías Geolocation API
    console.log('Obteniendo ubicación del usuario...');
  }

  toggleView() {
    this.showMapView = !this.showMapView;
  }

  showDogDetails(dog: any) {
    this.selectedDog = dog;
  }

  closeDetails() {
    this.selectedDog = null;
  }

  calculateWalkTime(distance: number): string {
    // 5 km/h velocidad promedio de paseo
    const minutes = Math.round((distance / 5) * 60);
    return `${minutes} min caminando`;
  }

  sendWalkRequest(dog: any) {
    console.log('Solicitud de paseo enviada a:', dog.name);
    // Lógica para enviar solicitud
  }

  filterDogs() {
    // Lógica de filtrado (simplificada)
    console.log('Aplicando filtros:', this.filters);
  }
}