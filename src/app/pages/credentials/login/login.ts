// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CredentialsService } from '../../../core/services/credentials.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
}) 
export class Login { 
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private CredentialService: CredentialsService
  ) {
    this.loginForm = this.fb.group({
      credential: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.CredentialService.logIn(this.loginForm.value).then((res: any) => {
        if(res.erroCode){
          this.errorMessage = res.errorDescription;
          this.isLoading = false;
          
        }else{
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['../'])
        } 

      })

    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}