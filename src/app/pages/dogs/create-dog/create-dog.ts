import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DogsService } from '../../../core/services/dogs.service';
import { Getters } from '../../../core/functions/getters';
import { filterBreeds, filterCities, filterProvinces } from '../../../core/models/filters';
import { Router } from '@angular/router';
import { Images } from '../../../core/functions/images.functions';

@Component({
  selector: 'app-create-dog',
  standalone: false,
  templateUrl: './create-dog.html',
  styleUrl: './create-dog.scss'
})
export class CreateDog {

  file: any;
  preview: any
  uploadedUrl = '';
  Image = new Images();

  loading: boolean = false
  dogForm: FormGroup;
  profileImage: string | ArrayBuffer | null = 'assets/dog-default-avatar.png';
  generalImages: (string | ArrayBuffer)[] = [];
  vaccineImages: (string | ArrayBuffer)[] = [];
  countries: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];
  breeds: any[] = [];

  getter = new Getters()


  constructor(
    private fb: FormBuilder,
    private dogService: DogsService,
    private router: Router
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
    this.breeds = await this.getter.getBreeds(filterBreeds({},0,10))
    console.log(this.breeds);
  }


  async getCities(){
    try {
      this.loading = true;
      if(this.dogForm.value.address.provinceId != ""){
        const filter = {
          countryId: this.dogForm.value.address.countryId,
          provinceId: this.dogForm.value.address.provinceId
        }
        this.cities = await this.getter.getCities(filterCities(filter, 0, 10))
        
      }else{
        this.cities = []
      }
      this.dogForm.value.address.cityId = "";
      this.loading = false
    } catch (error) {
      console.log(error);
    }
  }

  async getProvinces(){
    try {
      this.loading = true;
      if(this.dogForm.value.address.countryId != ""){
        const filter = {
          countryId: this.dogForm.value.address.countryId
        }
        this.provinces = await this.getter.getProvinces(filterProvinces(filter, 0, 10))
      }else{
        this.provinces = []
      }
      this.dogForm.value.address.provinceId = "";
      this.dogForm.value.address.cityId = "";

      this.cities = [];

      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }

  async getCountries(){
    try {
      this.loading = true;
      this.countries = await this.getter.getCountries();
      this.loading = false;
      
    } catch (error) {
      console.log(error);
    }
  }

  //////////////////////////////////////////////////////////

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

  ///////////////////////////////////////////////////////

  async onFileChange(event: any){
    this.file = event.target.files[0];
    
    this.preview = await this.Image.previewImage(this.file)
    
  }

  async onSubmit() {
    if (this.dogForm.valid) {
      let res:any = null
      res = await this.dogService.addDog(this.dogForm.value);


      if(res.errorDescription){
        alert(res.errorDescription)
      }else{

        if(this.preview){
          console.log(this.preview);
          console.log(res);
          
          
          this.uploadedUrl = await this.Image.uploadImage(this.file, 'dogs', res[0]._id)

          console.log(this.uploadedUrl);
          

          const newDogPhoto = await this.dogService.updateDog(res[0]._id, {profilePhoto: this.uploadedUrl});

          console.log(newDogPhoto);
          
          console.log('Foto actualizada');
          
          
        }
        alert('Dog Added')
        this.router.navigate(['/'])
      }


    }
  }
}

