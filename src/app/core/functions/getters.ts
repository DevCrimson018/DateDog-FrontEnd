import { inject } from "@angular/core";
import { CitiesService } from "../services/cities.service";
import { ProvincesService } from "../services/provinces.service";
import { CountriesService } from "../services/countries.service";
import { BreedsService } from "../services/breeds.service";
import { filterBreeds } from "../models/filters";

export class Getters{
    private cityService = inject(CitiesService)
    private provinceService = inject(ProvincesService)
    private countryService = inject(CountriesService)
    private breedService = inject(BreedsService)

    public  async getCities(filter: any){
        const cities = await this.cityService.filterCities(filter);
        return cities;
    }

    public async getProvinces(filter: any){
        const provinces = await this.provinceService.filterProvinces(filter);
        return provinces;
    }

    public async getCountries(){
        const countries = await this.countryService.filterCountries();
        return countries;
    }

    public async getBreeds(filter: any){
         const breeds = await this.breedService.filterBreeds(filter)
         return breeds
    }

}

