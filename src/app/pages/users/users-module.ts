import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing-module';
import { Users } from './users';
import { FilterUsers } from './filter-users/filter-users';
import { UserDetails } from './user-details/user-details';
import { EditUser } from './edit-user/edit-user';


@NgModule({
  declarations: [
    Users,
    FilterUsers,
    UserDetails,
    EditUser
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
