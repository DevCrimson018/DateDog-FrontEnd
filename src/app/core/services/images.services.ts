import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment.prod';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesServices {

  http = inject(HttpClient);

  async uploadImage(file: File, folder: string, public_id: string){

    const { timestamp, signature, apiKey, cloudName } =
    await this.getSignature(public_id, folder);

    const formData = new FormData;
    formData.append('file', file);
    formData.append('timestamp', timestamp.toString());
    formData.append("signature", signature);
    formData.append("api_key", apiKey);
    if (folder) formData.append("folder", folder);
    if (public_id) formData.append("public_id", public_id);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    return firstValueFrom(
      this.http.post(url, formData)
    )
  }


  async deleteImage(public_id: string){
    const { timestamp, signature, apiKey, cloudName } =
    await this.getSignature( public_id);

    const formData = new FormData;
    formData.append('timestamp', timestamp.toString());
    formData.append("signature", signature);
    formData.append("api_key", apiKey);
    //if (folder) formData.append("folder", folder);
    if (public_id) formData.append("public_id", public_id);

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    return firstValueFrom(
      this.http.post(url, formData)
    )

  }

  private getSignature(public_id: string, folder?: string ){
    let url = `${environment.apiUrl}/validation/signature?public_id=${public_id}`
    if (folder) url += `&folder=${folder}`;

    return firstValueFrom(
      this.http.get<any>(url)
    )
  }

}
