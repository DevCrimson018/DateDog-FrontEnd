import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dog',
  standalone: false,
  templateUrl: './edit-dog.html',
  styleUrl: './edit-dog.scss'
})
export class EditDog {

 editForm: FormGroup;
  breeds = ['Labrador', 'Poodle', 'Bulldog', 'Pastor Alemán', 'Chihuahua', 'Golden Retriever', 'Otro'];
  
  // Datos actuales del perro (ejemplo)
  currentDog = {
    name: 'Max',
    sex: 'Macho',
    breed: 'Labrador',
    profilePhoto: 'assets/dog-sample1.jpg',
    generalPhotos: [
      'assets/dog-sample2.jpg',
      'assets/dog-sample3.jpg'
    ],
    vaccinePhotos: [
      'assets/vaccine1.jpg'
    ]
  };

  profileImage: string | ArrayBuffer | null = this.currentDog.profilePhoto;
  generalImages: (string | ArrayBuffer)[] = this.currentDog.generalPhotos;
  vaccineImages: (string | ArrayBuffer)[] = this.currentDog.vaccinePhotos;
  selectedProfileFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      sex: ['', Validators.required],
      breed: ['', Validators.required],
      profilePhoto: [null],
      generalPhotos: [[]],
      vaccinePhotos: [[]]
    });
  }

  ngOnInit(): void {
    // Inicializar formulario con datos actuales
    this.editForm.patchValue({
      name: this.currentDog.name,
      sex: this.currentDog.sex,
      breed: this.currentDog.breed
    });
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

  onSubmit(): void {
    if (this.editForm.valid) {
      console.log('Formulario actualizado:', this.editForm.value);
      // Aquí iría la lógica para actualizar en el backend
      alert('¡Información del perro actualizada correctamente! 🐾');
    }
  }
}
