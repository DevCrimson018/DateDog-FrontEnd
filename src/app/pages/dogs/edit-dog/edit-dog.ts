import { Component, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DogsService } from '../../../core/services/dogs.service';

import { filterBreeds, filterCities, filterProvinces } from '../../../core/models/filters';
import { Getters } from '../../../core/functions/getters';

@Component({
  selector: 'app-edit-dog',
  standalone: false,
  templateUrl: './edit-dog.html',
  styleUrl: './edit-dog.scss'
})
export class EditDog {

  _id = input.required<string>()

  getter = new Getters()

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
    this.editForm.patchValue({
      name: this.currentDog.name,
      sex: this.currentDog.sex,
      idBreed: this.currentDog.idBreed._id,
      address: {
        countryId: this.currentDog.address.countryId._id,
        provinceId: this.currentDog.address.provinceId._id,
        cityId: this.currentDog.address.cityId._id
      }
    })
    await this.getCountries();
    await this.getProvinces();
    this.editForm.patchValue({
      address: {
        countryId: this.currentDog.address.countryId._id,
        provinceId: this.currentDog.address.provinceId._id,
        cityId: this.currentDog.address.cityId._id
      }
    })
    await this.getCities();
    this.editForm.patchValue({
      address: {
        countryId: this.currentDog.address.countryId._id,
        provinceId: this.currentDog.address.provinceId._id,
        cityId: this.currentDog.address.cityId._id
      }
    })
    ;
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
    const filter = {}
    this.breeds = await this.getter.getBreeds(filterBreeds(filter,0,10))
    console.log(this.breeds);
  }


  async getCities(){
    try {
      console.log("City");

      console.log(this.editForm.value);
      
      
      if(this.editForm.value.address.provinceId != ""){
        console.log("searching city");
        
        const filter = {
          countryId: this.editForm.value.address.countryId,
          provinceId: this.editForm.value.address.provinceId
        }
        this.cities = await this.getter.getCities(filterCities(filter, 0, 10))
      }else{
        this.cities = []
      }
      this.editForm.value.address.cityId = "";
    } catch (error) {
      console.log(error);
    }
  }

  async getProvinces(){
    try {
      if(this.editForm.value.address.countryId != ""){
        console.log("Searching Province");
        
        const filter = {
          countryId: this.editForm.value.address.countryId
        }
        this.provinces = await this.getter.getProvinces(filterProvinces(filter, 0, 10))
      }else{
        this.provinces = []
      }
      this.editForm.value.address.provinceId = "";
      this.editForm.value.address.cityId = "";

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
