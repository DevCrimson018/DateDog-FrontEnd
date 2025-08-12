import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  breeds = ['Labrador', 'Bulldog', 'Pastor Alemán', 'Chihuahua', 'Golden Retriever', 'Otro'];

  constructor(private fb: FormBuilder) {
    this.dogForm = this.fb.group({
      profilePhoto: [null],
      name: ['', [Validators.required, Validators.minLength(2)]],
      sex: ['', Validators.required],
      breed: ['', Validators.required],
      generalPhotos: [[]],
      vaccinePhotos: [[]]
    });
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

  onSubmit(): void {
    if (this.dogForm.valid) {
      console.log('Formulario enviado', this.dogForm.value);
      // Aquí iría la lógica para guardar la información del perro
    }
  }
}
