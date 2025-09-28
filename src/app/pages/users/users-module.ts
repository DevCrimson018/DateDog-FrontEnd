import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing-module';
import { Users } from './users';
import { FilterUsers } from './filter-users/filter-users';
import { UserDetails } from './user-details/user-details';
import { EditUser } from './edit-user/edit-user';
import { CardsModule } from "../../visual/cards/cards-module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewsModule } from "../../visual/views/views-module";


@NgModule({
  declarations: [
    Users,
    FilterUsers,
    UserDetails,
    EditUser
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    CardsModule,
    ViewsModule
]
})
export class UsersModule { }
