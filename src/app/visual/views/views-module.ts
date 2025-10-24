import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component/loading.component';
import { NavbarComponent } from './navbar.component/navbar.component';
import { CredentialsRoutingModule } from "../../pages/credentials/credentials-routing-module";




@NgModule({
  declarations: [
    LoadingComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    CredentialsRoutingModule
],
  exports: [
    LoadingComponent,
    NavbarComponent
  ]
})
export class ViewsModule { }
