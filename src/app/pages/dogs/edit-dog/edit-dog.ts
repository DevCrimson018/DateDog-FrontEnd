import { Component, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreedsService } from '../../../core/services/breeds.service';
import { CitiesService } from '../../../core/services/cities.service';
import { CountriesService } from '../../../core/services/countries.service';
import { DogsService } from '../../../core/services/dogs.service';
import { ProvincesService } from '../../../core/services/provinces.service';

@Component({
  selector: 'app-edit-dog',
  standalone: false,
  templateUrl: './edit-dog.html',
  styleUrl: './edit-dog.scss'
})
export class EditDog {

   _id = input.required<string>() 

  editForm: FormGroup;
 
  countries: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];
  breeds: any[] = [];
  // Datos actuales del perro (ejemplo)
  currentDog?: any

  profileImage: string | ArrayBuffer | null  = null//= this.currentDog.profilePhoto;
  generalImages: (string | ArrayBuffer)[] =  []//this.currentDog.generalPhotos;
  vaccineImages: (string | ArrayBuffer)[] =  []//this.currentDog.vaccinePhotos;
  selectedProfileFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private dogService: DogsService,
    private breedService: BreedsService,
    private countryService: CountriesService,
    private provinceService: ProvincesService,
    private cityService: CitiesService
  ) {
    this.editForm = this.fb.group({
      profilePhoto: [null],
      name: ['', [Validators.required, Validators.minLength(2)]],
      // dateOfBirth: ['', Validators.required],
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

  async ngOnInit() {
    // Inicializar formulario con datos actuales
    await this.getDogCurrentData();
    await this.getBreeds();
    await this.getCountries();
    this.editForm.patchValue({
      name: this.currentDog.name,
      sex: this.currentDog.sex,
      idBreed: this.currentDog.idBreed._id 
    });
  }

  async getDogCurrentData(){
    try {
      this.currentDog = await this.dogService.getDog(this._id());
      console.log(this.currentDog);
      
    } catch (error) {
      console.log(error);
      
    }
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
                                                        countryId: this.editForm.value.address.countryId,
                                                        provinceId: this.editForm.value.address.provinceId
                                                      },
                                                      skip: 0,
                                                      limit: 10
                                                    });
      console.log(this.cities);
      console.log(this.editForm.value.address.countryId);
      console.log(this.editForm.value.address.provinceId);
    } catch (error) {
      console.log(error);
    }
  }

  async getProvinces(){
    try {
      this.provinces = await this.provinceService.filterProvinces({
                                                                  filter: {
                                                                    countryId: this.editForm.value.address.countryId
                                                                  },
                                                                  skip: 0,
                                                                  limit: 10});
      console.log(this.provinces);
      console.log(this.editForm.value.address.countryId);
      
      
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
      this.selectedProfileFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      this.editForm.patchValue({ profilePhoto: file });
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
      const newFiles = Array.from(files).slice(0, 5 - imagesArray.length);
      
      newFiles.forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagesArray.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });

      const currentFiles = this.editForm.get(controlName)?.value || [];
      this.editForm.patchValue({ 
        [controlName]: [...currentFiles, ...newFiles] 
      });
    }
  }

  removeGeneralPhoto(index: number): void {
    this.generalImages.splice(index, 1);
    const currentFiles = this.editForm.get('generalPhotos')?.value || [];
    currentFiles.splice(index, 1);
    this.editForm.patchValue({ generalPhotos: currentFiles });
  }

  removeVaccinePhoto(index: number): void {
    this.vaccineImages.splice(index, 1);
    const currentFiles = this.editForm.get('vaccinePhotos')?.value || [];
    currentFiles.splice(index, 1);
    this.editForm.patchValue({ vaccinePhotos: currentFiles });
  }

  removeProfilePhoto(): void {
    this.profileImage = 'assets/dog-default-avatar.png';
    this.selectedProfileFile = null;
    this.editForm.patchValue({ profilePhoto: null });
  }

  async onSubmit() {
    if (this.editForm.valid) {

      if(this.editForm.value.address.countryId == '' || 
        this.editForm.value.address.provinceId == '' ||
        this.editForm.value.address.cityId == ''){
        delete this.editForm.value.address
      }

      let message = await this.dogService.updateDog(this._id(), this.editForm.value)

      

      console.log('Formulario actualizado:', message);
      // Aquí iría la lógica para actualizar en el backend
      alert('¡Información del perro actualizada correctamente! 🐾');
    }
  }
}
