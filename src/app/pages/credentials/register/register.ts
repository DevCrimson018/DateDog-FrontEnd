import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../../core/services/countries.service';
import { ProvincesService } from '../../../core/services/provinces.service';
import { CitiesService } from '../../../core/services/cities.service';
import { CredentialsService } from '../../../core/services/credentials.service';

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

  constructor(
    private fb: FormBuilder,
    private credentialService: CredentialsService,
    private countryService: CountriesService,
    private provinceService: ProvincesService,
    private cityService: CitiesService
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
      this.cities = await this.cityService.getCities(this.registerForm.value.address.countryId, this.registerForm.value.address.provinceId);
       console.log(this.cities);
      console.log(this.registerForm.value.address.countryId);
      console.log(this.registerForm.value.address.provinceId);
    } catch (error) {
      console.log(error);
    }
  }

  async getProvinces(){
    try {
      this.provinces = await this.provinceService.getProvinces(this.registerForm.value.address.countryId);
      console.log(this.provinces);
      console.log(this.registerForm.value.address.countryId);
      
      
    } catch (error) {
      console.log(error);
    }
  }

  async getCountries(){
    try {
      this.countries = await this.countryService.getCountries();
      console.log(this.countries);
      
    } catch (error) {
      console.log(error);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
}