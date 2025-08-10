import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm: FormGroup;
  showPassword = false;
  countries = ['México', 'España', 'Argentina', 'Colombia', 'Chile'];
  provinces: string[] = [];
  municipalities: string[] = [];
  profileImage: string | ArrayBuffer | null = 'assets/dog-default-avatar.png'; // Ruta a imagen por defecto
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {

       this.registerForm = this.fb.group({
      // ... (campos existentes)
      profilePhoto: [null]
    });

    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(30)]],
      sexo: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      ciudad: [''],
      municipio: [''],
      provincia: [''],
      pais: ['', Validators.required],




    });

    this.registerForm.get('pais')?.valueChanges.subscribe(pais => {
      this.updateProvinces(pais);
    });

    this.registerForm.get('provincia')?.valueChanges.subscribe(provincia => {
      this.updateMunicipalities(provincia);
    });
  }



  updateProvinces(pais: string) {
    // Lógica para cargar provincias según país
    this.provinces = this.getProvincesByCountry(pais);
    this.registerForm.get('provincia')?.reset();
    this.registerForm.get('municipio')?.reset();
  }

  updateMunicipalities(provincia: string) {
    // Lógica para cargar municipios según provincia
    this.municipalities = this.getMunicipalitiesByProvince(provincia);
    this.registerForm.get('municipio')?.reset();
  }

  getProvincesByCountry(pais: string): string[] {
    // Ejemplo básico - deberías reemplazarlo con tus datos reales
    if (pais === 'México') return ['Ciudad de México', 'Jalisco', 'Nuevo León'];
    if (pais === 'España') return ['Madrid', 'Cataluña', 'Andalucía'];
    return [];
  }

  getMunicipalitiesByProvince(provincia: string): string[] {
    // Ejemplo básico - deberías reemplazarlo con tus datos reales
    if (provincia === 'Ciudad de México') return ['Álvaro Obregón', 'Benito Juárez', 'Coyoacán'];
    if (provincia === 'Jalisco') return ['Guadalajara', 'Zapopan', 'Tlaquepaque'];
    return [];
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario enviado', this.registerForm.value);
      // Aquí iría la lógica para registrar al usuario
    }
  }

    onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      // Previsualización de la imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      
      this.registerForm.patchValue({
        profilePhoto: file
      });
    }
  }

  removeProfileImage(): void {
    this.profileImage = 'assets/dog-default-avatar.png';
    this.selectedFile = null;
    this.registerForm.patchValue({
      profilePhoto: null
    });
  }

  uploadProfilePhoto(): void {
  if (this.selectedFile) {
    const formData = new FormData();
    formData.append('profilePhoto', this.selectedFile);
    
    // Aquí iría tu llamada HTTP al servidor
    // this.http.post('/api/upload-profile', formData).subscribe(...)
  }
}
}