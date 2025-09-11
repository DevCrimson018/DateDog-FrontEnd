import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate{
  private validationService = inject(ValidationService);
  private router = inject(Router);

  async canActivate(): Promise<boolean>{
    let isValid: boolean = false;
    isValid = await this.validationService.validateAdmin();
    if(isValid == true){
      return true;
    }else{
      this.router.navigate(['/credentials']);
      return false;
    }
  }
}