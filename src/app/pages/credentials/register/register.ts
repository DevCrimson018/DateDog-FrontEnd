import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CredentialsService } from '../../../core/services/credentials.service';
import { filterCities, filterProvinces } from '../../../core/models/filters';
import { Getters } from '../../../core/functions/getters';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm: FormGroup;
  showPassword = false; 
  countries: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];
  profileImage: string | ArrayBuffer | null = 'assets/dog-default-avatar.png'; // Ruta a imagen por defecto
  selectedFile: File | null = null;
  getter = new Getters()
  

  constructor(
    private fb: FormBuilder,
    private credentialService: CredentialsService,

  ) {



    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', [Validators.required, Validators.min(1), Validators.max(30)]],

      // sexo: ['', Validators.required],
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
      const message = await this.credentialService.register(this.registerForm.value)
      console.log(message);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async getCities(){
    try {
      const filter = {
        countryId: this.registerForm.value.address.countryId,
        provinceId: this.registerForm.value.address.provinceId
      }
      this.cities = await this.getter.getCities(filterCities(filter, 0, 10))
    } catch (error) {
      console.log(error);
    }
  }

  async getProvinces(){
    try {
      const filter = {
        countryId: this.registerForm.value.address.countryId
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
}