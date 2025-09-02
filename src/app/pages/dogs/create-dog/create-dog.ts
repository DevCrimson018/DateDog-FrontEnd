import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreedsService } from '../../../core/services/breeds.service';
import { CitiesService } from '../../../core/services/cities.service';
import { CountriesService } from '../../../core/services/countries.service';
import { ProvincesService } from '../../../core/services/provinces.service';
import { DogsService } from '../../../core/services/dogs.service';

@Component({
  selector: 'app-create-dog',
  standalone: false,
  templateUrl: './create-dog.html',
  styleUrl: './create-dog.scss'
})
export class CreateDog {

  dogForm: FormGroup;
  profileImage: string | ArrayBuffer | null = 'assets/dog-default-avatar.png';
  generalImages: (string | ArrayBuffer)[] = [];
  vaccineImages: (string | ArrayBuffer)[] = [];
  countries: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];
  breeds: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dogService: DogsService,
    private breedService: BreedsService,
    private countryService: CountriesService,
    private provinceService: ProvincesService,
    private cityService: CitiesService
  ) {
    this.dogForm = this.fb.group({
      profilePhoto: [null],
      name: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      sex: ['', Validators.required],
      idBreed: ['', Validators.required],
      photos: [[]],
      vaccines: [[]],
      address: this.fb.group({
        cityId: [''],
        provinceId: [''],
        countryId: [''],
      })
    });
  }

  async ngOnInit(){
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
      this.cities = await this.cityService.filterCities({
                                                      filter: {
                                                        countryId: this.dogForm.value.address.countryId,
                                                        provinceId: this.dogForm.value.address.provinceId
                                                      },
                                                      skip: 0,
                                                      limit: 10
                                                    });
      console.log(this.cities);
      console.log(this.dogForm.value.address.countryId);
      console.log(this.dogForm.value.address.provinceId);
    } catch (error) {
      console.log(error);
    }
  }

  async getProvinces(){
    try {
      this.provinces = await this.provinceService.filterProvinces({
                                                                  filter: {
                                                                    countryId: this.dogForm.value.address.countryId
                                                                  },
                                                                  skip: 0,
                                                                  limit: 10});
      console.log(this.provinces);
      console.log(this.dogForm.value.address.countryId);
      
      
    } catch (error) {
      console.log(error);
    }
  }

  async getCountries(){
    try {
      this.countries = await this.countryService.filterCountries();
      console.log(this.countries);
      
    } catch (error) {
      console.log(error);
    }
  }


  onProfilePhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      this.dogForm.patchValue({ profilePhoto: file });
    }
  }

  onGeneralPhotosSelected(event: any): void {
    this.handleMultipleFiles(event, this.generalImages, 'generalPhotos');
  }

  onVaccinePhotosSelected(event: any): void {
    this.handleMultipleFiles(event, this.vaccineImages, 'vaccinePhotos');
  }

  private handleMultipleFiles(event: any, imagesArray: (string | ArrayBuffer)[], controlName: string): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      imagesArray.length = 0; // Limpiar array existente
      
      for (let i = 0; i < Math.min(files.length, 5); i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagesArray.push(e.target?.result as string);
        };
        reader.readAsDataURL(files[i]);
      }
      
      this.dogForm.patchValue({ [controlName]: Array.from(files).slice(0, 5) });
    }
  }

  removeImage(array: (string | ArrayBuffer)[], index: number): void {
    array.splice(index, 1);
  }

  async onSubmit() {
    if (this.dogForm.valid) {
      let message = await this.dogService.addDog(this.dogForm.value)
      console.log('Formulario enviado', message);

      // Aquí iría la lógica para guardar la información del perro
    }
  }
}
