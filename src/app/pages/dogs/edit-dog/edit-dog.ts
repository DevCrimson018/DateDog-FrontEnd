import { Component, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DogsService } from '../../../core/services/dogs.service';

import { filterBreeds, filterCities, filterProvinces } from '../../../core/models/filters';
import { Getters } from '../../../core/functions/getters';
import { Router } from '@angular/router';
import { Images } from '../../../core/functions/images.functions';

@Component({
  selector: 'app-edit-dog',
  standalone: false,
  templateUrl: './edit-dog.html',
  styleUrl: './edit-dog.scss'
})
export class EditDog {


  Image = new Images();
  profilePhotoFile: any
  previewProfilePhoto: any
  uploadedPhotoUrl: string = '';

  loading:boolean = false
  loadingComboBox: boolean = false

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
    private router: Router
  ) {
    this.editForm = this.fb.group({
      profilePhoto: [''],
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
    this.loading = true
    await this.getDogCurrentData();
    await this.getBreeds();
    this.editForm.patchValue({
      name: this.currentDog.name,
      sex: this.currentDog.sex,
      idBreed: this.currentDog.idBreed._id,
      profilePhoto: this.currentDog.profilePhoto,
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


    this.loading = false
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
    this.loadingComboBox = true
    const filter = {}
    this.breeds = await this.getter.getBreeds(filterBreeds(filter,0,10))
    console.log(this.breeds);
    this.loadingComboBox = false
  }


  async getCities(){
    try {
      this.loadingComboBox = true
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
      this.loadingComboBox = false
    } catch (error) {
      console.log(error);
    }
  }

  async getProvinces(){
    try {
      this.loadingComboBox = true
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
      this.loadingComboBox = false
    } catch (error) {
      console.log(error);
    }
  }

  async getCountries(){
    try {
      this.loadingComboBox = true
      this.countries = await this.getter.getCountries();
      this.loadingComboBox = false
      
    } catch (error) {
      console.log(error);
    }
  }
  
  async onSubmit() {
    if (this.editForm.valid) {

      if(this.editForm.value.address.countryId == '' || 
        this.editForm.value.address.provinceId == '' ||
        this.editForm.value.address.cityId == ''){
        delete this.editForm.value.address
      }


      if(this.previewProfilePhoto){
        console.log(this.previewProfilePhoto);
        
        this.uploadedPhotoUrl = await this.Image.uploadImage(this.profilePhotoFile, 'dogs', this.currentDog._id)
        
        
        this.editForm.patchValue({
          profilePhoto: this.uploadedPhotoUrl

        })
      }
      let message = await this.dogService.updateDog(this._id(), this.editForm.value)

      

      if(message.errorDescription){
        alert(message.errorDescription)
      }else{
        // Aquí iría la lógica para actualizar en el backend
        alert('¡Información del perro actualizada correctamente! 🐾');
        this.router.navigate(['/']);
      }
      
    }
  }

  async onFileChange(event: any){
    this.profilePhotoFile = event.target.files[0];
    
    this.previewProfilePhoto = await this.Image.previewImage(this.profilePhotoFile)
    
  }

}
