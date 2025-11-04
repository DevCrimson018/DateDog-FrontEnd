import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterUsers } from './filter-users/filter-users';
import { UserDetails } from './user-details/user-details';
import { EditUser } from './edit-user/edit-user';
import { Users } from './users';

const routes: Routes = [
  {
    path: '',
    component: Users,
    children: [
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
        path: 'edit-user/myself',
        component: EditUser
      },
      {
        path: 'user-details/:_id',
        component: UserDetails
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
