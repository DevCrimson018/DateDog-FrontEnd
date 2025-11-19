import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesServices {
  
  private cloudName = 'dnjivgpns';
  private uploadPreset = 'imagenes_test';

  http = inject(HttpClient);

  uploadImage(file: File){
    const formData = new FormData;
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;


    return this.http.post(url, formData)
  }

}
