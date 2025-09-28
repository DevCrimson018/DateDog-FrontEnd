import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from '../../../core/services/credentials.service';
import { filterCities, filterProvinces } from '../../../core/models/filters';
import { Getters } from '../../../core/functions/getters';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm: FormGroup;
  showPassword = false; 
  loading: boolean = false
  countries: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];
  profileImage: string | ArrayBuffer | null = 'assets/dog-default-avatar.png'; // Ruta a imagen por defecto
  selectedFile: File | null = null;
  getter = new Getters()
  

  constructor(
    private fb: FormBuilder,
    private credentialService: CredentialsService,
    private router: Router

  ) {



    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', [Validators.required, Validators.min(1), Validators.max(30)]],

      sex: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: this.fb.group({
        cityId: ['', Validators.required],
        provinceId: ['', Validators.required],
        countryId: ['', Validators.required],
      })
      // pais: ['', Validators.required],
    });


  }

  ngOnInit(): void {
    this.getCountries();
  }

  async onSubmit(){
    try {
      this.loading = true;
      const message:any = await this.credentialService.register(this.registerForm.value);
      if(message.errorCode){
        alert(message.errorCode)
      }else{
        this.router.navigate(['../'])
      }
      this.loading = false;
      console.log(message);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async getCities(){
    try {
      this.loading = true;
      if(this.registerForm.value.address.provinceId != ""){
        const filter = {
          countryId: this.registerForm.value.address.countryId,
          provinceId: this.registerForm.value.address.provinceId
        }
        this.cities = await this.getter.getCities(filterCities(filter, 0, 10))
        
      }else{
        this.cities = []
      }
      this.registerForm.value.address.cityId = "";
      this.loading = false
    } catch (error) {
      console.log(error);
    }
  }

  async getProvinces(){
    try {
      this.loading = true;
      if(this.registerForm.value.address.countryId != ""){
        const filter = {
          countryId: this.registerForm.value.address.countryId
        }
        this.provinces = await this.getter.getProvinces(filterProvinces(filter, 0, 10))
      }else{
        this.provinces = []
      }
      this.registerForm.value.address.provinceId = "";
      this.registerForm.value.address.cityId = "";

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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
}