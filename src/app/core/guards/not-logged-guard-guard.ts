import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';

@Injectable({
  providedIn: 'root'
})

export class notLoggedGuardGuard implements CanActivate{
  private validationService = inject(ValidationService)
  private router = inject(Router)

  async canActivate(): Promise<boolean>{
    let isLogged: any;
    isLogged = await  this.validationService.validateLoggedIn();

    
    if(isLogged.errorCode == 1.1){
      return true
    }else{
      this.router.navigate([''])
      return false
    }
  }
};
