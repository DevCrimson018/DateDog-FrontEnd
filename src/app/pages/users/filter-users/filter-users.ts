import { Component } from '@angular/core';
import { Getters } from '../../../core/functions/getters';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filterCities, filterProvinces, filterUsers } from '../../../core/models/filters';

@Component({
  selector: 'app-filter-users',
  standalone: false,
  templateUrl: './filter-users.html',
  styleUrl: './filter-users.scss'
})
export class FilterUsers {

  searchForm: FormGroup;

  countries: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];

  searchResults: any[] = [];

  getter = new Getters();

  constructor(
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      name: [''],
      address: this.fb.group({
        countryId: [''],
        provinceId: [''],
        cityId: ['']
      })
    });
  }

  async ngOnInit(){
    await this.getCountries()
  }

  async onSearch(){
    try {
      
    const filter = {
      name: this.searchForm.value.name || null,
      address: {
        cityId: this.searchForm.value.address.cityId || null,
        provinceId: this.searchForm.value.address.provinceId || null,
        countryId: this.searchForm.value.address.countryId || null
      }
    }
    this.searchResults = await this.getter.getUsers(filterUsers(filter, 0, 10))

    console.log(this.searchResults);

    } catch (error) {
      console.log(error);
    }
  }

  async getCities(){
    try {
      if(this.searchForm.value.address.provinceId != ""){
        const filter = {
          countryId: this.searchForm.value.address.countryId,
          provinceId: this.searchForm.value.address.provinceId
        }
        this.cities = await this.getter.getCities(filterCities(filter, 0, 10))
      }else{
        this.cities = []
      }
      this.searchForm.value.address.cityId = "";
    } catch (error) {
      console.log(error);
    }
  }

  async getProvinces(){
    try {
      if(this.searchForm.value.address.countryId != ""){
        const filter = {
          countryId: this.searchForm.value.address.countryId
        }
        this.provinces = await this.getter.getProvinces(filterProvinces(filter, 0, 10))
      }else{
        this.provinces = []
      }
      this.searchForm.value.address.provinceId = "";
      this.searchForm.value.address.cityId = "";

      this.cities = [];
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
  clearFilters(): void {
    this.searchForm.reset();
    this.searchResults = []
  }

}
