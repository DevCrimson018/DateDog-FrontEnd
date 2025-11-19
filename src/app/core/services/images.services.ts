import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment.prod';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesServices {
  
  //private cloudName = 'dnjivgpns';
  private uploadPreset = 'imagenes_test';

  http = inject(HttpClient);

  async uploadImage(file: File, folder: string, public_id?: string){

    const { timestamp, signature, apiKey, cloudName } =
    await this.getSignature(folder, public_id);

    console.log({ timestamp, signature, apiKey, cloudName });
    

    const formData = new FormData;
    formData.append('file', file);
    formData.append('timestamp', timestamp.toString());
    formData.append("signature", signature);
    formData.append("api_key", apiKey);
    if (folder) formData.append("folder", folder);
    if (public_id) formData.append("public_id", public_id);

    //formData.append('upload_preset', this.uploadPreset);
    // formData.append('public_id', 'TEST');


    


    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    console.log(formData);
    

    return this.http.post(url, formData)
  }

  private getSignature(folder: string, public_id?: string){
    let url = `${environment.apiUrl}/validation/signature?folder=${folder}`
    if (public_id) url += `&public_id=${public_id}`;

    return firstValueFrom(
      this.http.get<any>(url)
    )
  }

}
