import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';

@Injectable({
  providedIn: 'root'
})
export class loggedGuard implements CanActivate{
  
  private validationService = inject(ValidationService)
  private router = inject(Router)

  async canActivate(): Promise<boolean>{
    let isLogged: boolean = false;
    isLogged = await  this.validationService.validateLoggedIn();
    
    if(isLogged == true){
      return true
    }else{
      this.router.navigate(['/credentials'])
      return false
    }
  }
}