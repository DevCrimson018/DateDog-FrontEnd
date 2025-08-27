import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-dogs',
  standalone: false,
  templateUrl: './filter-dogs.html',
  styleUrl: './filter-dogs.scss'
})
export class FilterDogs {

searchForm: FormGroup;
  showResults = false;

  // Datos de ejemplo para los selects
  breeds = ['Labrador', 'Poodle', 'Bulldog', 'Pastor Alemán', 'Chihuahua', 'Golden Retriever'];
  sexes = ['Macho', 'Hembra'];
  countries = ['República Dominicana', 'México', 'España', 'Colombia', 'Argentina'];
  provinces = ['Distrito Nacional', 'Santo Domingo', 'Santiago', 'La Vega', 'Puerto Plata'];
  cities = ['Santo Domingo Este', 'Santo Domingo Oeste', 'Santo Domingo Norte', 'Zona Colonial'];

  // Resultados de ejemplo
  searchResults = [
    {
      name: 'Max',
      breed: 'Labrador',
      sex: 'Macho',
      birthDate: '2020-03-12',
      profilePhoto: 'assets/dog-sample1.jpg',
      location: 'Santo Domingo, DN'
    },
    {
      name: 'Luna',
      breed: 'Poodle',
      sex: 'Hembra', 
      birthDate: '2021-06-25',
      profilePhoto: 'assets/dog-sample2.jpg',
      location: 'Santiago, ST'
    },
    {
      name: 'Rocky',
      breed: 'Bulldog',
      sex: 'Macho',
      birthDate: '2019-11-15',
      profilePhoto: 'assets/dog-sample3.jpg',
      location: 'La Vega, LV'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      breed: [''],
      sex: [''],
      country: [''],
      province: [''],
      city: ['']
    });
  }

  onSearch(): void {
    this.showResults = true;
    // Aquí iría la lógica real de búsqueda con tu API
    console.log('Buscando con filtros:', this.searchForm.value);
  }

  clearFilters(): void {
    this.searchForm.reset();
    this.showResults = false;
  }

  formatBirthDate(date: string): string {
    return new Date(date).toLocaleDateString('es-ES');
  }

  getAge(birthDate: string): string {
    const today = new Date();
    const birth = new Date(birthDate);
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    
    if (months < 0) {
      return `${years - 1} años`;
    }
    return `${years} años`;
  }
}
