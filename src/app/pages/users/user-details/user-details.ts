import { Component } from '@angular/core';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss'
})
export class UserDetails {
  // Datos del usuario (ejemplo)
  userData = {
    profilePhoto: 'assets/user-default-avatar.png',
    name: 'Juana Pérez',
    age: 30,
    sex: 'Femenino',
    city: 'Santo Domingo',
    province: 'Distrito Nacional',
    country: 'República Dominicana',
    dogs: [
      {
        name: 'Max',
        breed: 'Golden Retriever',
        sex: 'Macho',
        profilePhoto: 'assets/dog-sample1.jpg',
        age: 4
      },
      {
        name: 'Luna',
        breed: 'Poodle',
        sex: 'Hembra',
        profilePhoto: 'assets/dog-sample2.jpg',
        age: 2
      }
    ]
  };

  getSexSymbol(sex: string): string {
    return sex === 'Macho' ? '♂' : '♀';
  }

  getSexLabel(sex: string): string {
    return sex === 'Macho' ? 'Macho' : 'Hembra';
  }
}