import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterUsers } from './filter-users/filter-users';
import { UserDetails } from './user-details/user-details';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'filter-users',
    pathMatch: 'full'
  },
  {
    path: 'filter-users',
    component: FilterUsers
  },
  {
    path: 'edit-user',
    component: UserDetails
  },
  {
    path: 'user-details',
    component: UserDetails
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
