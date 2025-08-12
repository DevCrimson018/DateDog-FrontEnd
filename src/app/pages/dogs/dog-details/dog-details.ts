import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-dog-details',
  standalone: false,
  templateUrl: './dog-details.html',
  styleUrl: './dog-details.scss'
})
export class DogDetails {
  @Input() dogData: any = {
    profilePhoto: 'assets/dog-default-avatar.png',
    name: 'Max',
    sex: 'Macho',
    breed: 'Labrador',
    owner: 'Juan Pérez',
    address: 'Santo Domingo, DN, República Dominicana',
    generalPhotos: [
      'assets/dog-sample1.jpg',
      'assets/dog-sample2.jpg',
      'assets/dog-sample3.jpg'
    ],
    vaccinePhotos: [
      'assets/vaccine1.jpg',
      'assets/vaccine2.jpg'
    ]
  };

  // Añade este método para manejar la apertura de fotos
  openPhoto(photoUrl: string): void {
    // Implementación básica - puedes mejorarla según tus necesidades
    console.log('Abriendo foto:', photoUrl);
    window.open(photoUrl, '_blank'); // Abre la imagen en una nueva pestaña
    
    // Alternativa más elegante: Mostrar en un modal/dialog
    // this.showPhotoInModal(photoUrl);
  }

  // Opcional: Método para mostrar la foto en un modal
  /*
  private showPhotoInModal(photoUrl: string): void {
    // Implementa tu lógica para mostrar un modal aquí
    // Necesitarás importar e inyectar el servicio de diálogo/modal de Angular Material
  }
  */
}