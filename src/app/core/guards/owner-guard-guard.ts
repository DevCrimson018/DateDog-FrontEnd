import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ValidationService } from '../services/validation.service';

@Injectable({
  providedIn: 'root'
})
export class ownerGuard implements CanActivate{
 
  
  private validationService = inject(ValidationService);
  private router = inject(Router);

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean>{
    let isValid: boolean = false;
    const _id = route.paramMap.get('_id') || '';

    isValid = await this.validationService.validateIsOwner(_id);
    if(isValid == true){
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }
}