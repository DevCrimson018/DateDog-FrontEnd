import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialsRoutingModule } from './credentials-routing-module';
import { Credentials } from './credentials';
import { Register } from './register/register';
import { Login } from './login/login';
import { ForgotPassword } from './forgot-password/forgot-password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComboBoxesModule } from "../../visual/combo-boxes/combo-boxes-module";
import { ViewsModule } from "../../visual/views/views-module";


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
    CredentialsRoutingModule,
    ComboBoxesModule,
    ViewsModule
]
})
export class CredentialsModule { }
