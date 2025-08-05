import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DogsRoutingModule } from './dogs-routing-module';
import { Dogs } from './dogs';
import { FilterDogs } from './filter-dogs/filter-dogs';
import { CreateDog } from './create-dog/create-dog';
import { DogDetails } from './dog-details/dog-details';
import { EditDog } from './edit-dog/edit-dog';


@NgModule({
  declarations: [
    Dogs,
    FilterDogs,
    CreateDog,
    DogDetails,
    EditDog
  ],
  imports: [
    CommonModule,
    DogsRoutingModule
  ]
})
export class DogsModule { }
