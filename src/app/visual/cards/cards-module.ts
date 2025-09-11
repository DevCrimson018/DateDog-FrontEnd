import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogsFilteredComponent } from './dogs-filtered.component/dogs-filtered.component';
import { UserDogsComponents } from './user-dogs.components/user-dogs.components';
import { CredentialsRoutingModule } from "../../pages/credentials/credentials-routing-module";
import { DogsHomeComponent } from './dogs-home.component/dogs-home.component';



@NgModule({
  declarations: [
    DogsFilteredComponent,
    UserDogsComponents,
    DogsHomeComponent
  ],
  imports: [
    CommonModule,
    CredentialsRoutingModule
],
  exports: [
    DogsFilteredComponent,
    UserDogsComponents,
    DogsHomeComponent
  ]
})
export class CardsModule { }
