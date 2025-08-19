import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialsRoutingModule } from './credentials-routing-module';
import { Credentials } from './credentials';
import { Register } from './register/register';
import { Login } from './login/login';
import { ForgotPassword } from './forgot-password/forgot-password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ 
    Credentials,
    Register,
    Login, 
    ForgotPassword
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CredentialsRoutingModule
  ]
})
export class CredentialsModule { }
