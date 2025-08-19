import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../../core/services/countries.service';

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
  municipalities: any[] = [];
  profileImage: string | ArrayBuffer | null = 'assets/dog-default-avatar.png'; // Ruta a imagen por defecto
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private countryService: CountriesService
  ) {

       this.registerForm = this.fb.group({
      // ... (campos existentes)
      profilePhoto: [null]
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', [Validators.required, Validators.min(1), Validators.max(30)]],

      // sexo: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: {
        cityId: ['', Validators.required],
        provinceId: ['', Validators.required],
        countryId: ['', Validators.required],
      }
      // pais: ['', Validators.required],


    });


  }



  onSubmit(){

  }


  getCountries(){
    
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
}