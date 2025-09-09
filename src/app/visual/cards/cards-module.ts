import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DogsFilteredComponent } from './dogs-filtered.component/dogs-filtered.component';
import { UserDogsComponents } from './user-dogs.components/user-dogs.components';



@NgModule({
  declarations: [
    DogsFilteredComponent,
    UserDogsComponents
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DogsFilteredComponent,
    UserDogsComponents
  ]
})
export class CardsModule { }
