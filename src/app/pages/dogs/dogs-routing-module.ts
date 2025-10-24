import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterDogs } from './filter-dogs/filter-dogs';
import { CreateDog } from './create-dog/create-dog';
import { DogDetails } from './dog-details/dog-details';
import { EditDog } from './edit-dog/edit-dog';
import { ownerGuard } from '../../core/guards/owner-guard-guard';
import { Dogs } from './dogs';

const routes: Routes = [
  {
    path: '',
    component: Dogs,
    children: [
      {
        path: '',
        redirectTo: 'filter-dogs',
        pathMatch: 'full'
      },
      {
        path: 'filter-dogs',
        component: FilterDogs
      },
      {
        path: 'create-dog',
        component: CreateDog
      },
      {
        path: 'dog-details/:_id',
        component: DogDetails
      },
      {
        path: 'edit-dog/:_id',
        component: EditDog,
        canActivate: [ownerGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DogsRoutingModule { }
