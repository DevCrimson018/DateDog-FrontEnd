import { inject } from "@angular/core";
import { ImagesServices } from "../services/images.services";

export class Images{
    
    // private imageService = inject(ImagesServices);

    public previewImage(file: any):Promise<string> {

        return new Promise((resolve, reject) => {
            let preview:any;
            const reader = new FileReader();
            reader.onload = async () => {
                preview = reader.result;
                
                resolve(preview)
            }
            
            reader.readAsDataURL(file); 
        });
    }
    

    // async uploadImage(file:any, folder: string, public_id?: string){
    //     let res:any = await this.imageService.uploadImage(file, folder, public_id)
    //     return res.secure_url;
    // }

}