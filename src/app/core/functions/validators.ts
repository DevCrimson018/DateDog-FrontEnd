import { inject } from "@angular/core";
import { ValidationService } from "../services/validation.service";

export class Validators{
    
    private validationService = inject(ValidationService);

    public async checkIsOwner(dogId: string){
        try {
            const answer = this.validationService.validateIsOwner(dogId);
            return answer
        } catch (error) {
            console.log(error);
            
        }
    }

    public async checkIsTheSameUser(_id: string){
        try {
            const answer = this.validationService.validateIsTheSameUser(_id);
            return answer;
        } catch (error) {
            console.log(error);
        }
    }

}