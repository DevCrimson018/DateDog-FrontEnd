import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BreedsService } from '../../../core/services/breeds.service';
import { DogsService } from '../../../core/services/dogs.service';
import { Getters } from '../../../core/functions/getters';
import { filterCities, filterProvinces } from '../../../core/models/filters';

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
  countries: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];
  breeds: any[] = [];

  // Resultados de ejemplo
  searchResults: any[] = [];

  getter = new Getters()

  constructor(
    private fb: FormBuilder,
    private dogService: DogsService,
    private breedService: BreedsService,
  ) {
    this.searchForm = this.fb.group({
      idBreed: [''],
      sex: [''],
      address: this.fb.group({
        countryId: [''],
        provinceId: [''],
        cityId: ['']
      })
    });
  }

  async ngOnInit() {
    await this.getBreeds()
    await this.getCountries()
  }


  async getBreeds(){
    this.breeds = await this.breedService.filterBreeds(
      {
        filter: {

        },
        skip: 0,
        limit: 10
      }
    )

    console.log(this.breeds);
  }


  async getCities(){
      try {
        const filter = {
          countryId: this.searchForm.value.address.countryId,
          provinceId: this.searchForm.value.address.provinceId
        }
        this.cities = await this.getter.getCities(filterCities(filter, 0, 10))
      } catch (error) {
        console.log(error);
      }
    }
  
    async getProvinces(){
      try {
        const filter = {
          countryId: this.searchForm.value.address.countryId
        }
        this.provinces = await this.getter.getProvinces(filterProvinces(filter, 0, 10))
      } catch (error) {
        console.log(error);
      }
    }
  
    async getCountries(){
      try {
        this.countries = await this.getter.getCountries();
      } catch (error) {
        console.log(error);
      }
    }
  async onSearch() {
    this.showResults = true;
    // Aquí iría la lógica real de búsqueda con tu API

    this.searchResults = await this.dogService.filterDogs(
      {
        filter: {
          sex: this.searchForm.value.sex
        },
        skip: 0,
        limit: 10
      }
    )
    console.log('Buscando con filtros:', this.searchResults);
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
