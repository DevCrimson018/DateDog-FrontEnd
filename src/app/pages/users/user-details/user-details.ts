import { Component, inject, input } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { formatBirthDate, getAge, getSexLabel, getSexSymbol } from '../../../core/functions/converters-formarters';
import { Getters } from '../../../core/functions/getters';
import { filterDogs } from '../../../core/models/filters';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss'
})
export class UserDetails {
  // Datos del usuario (ejemplo)
  _id = input.required<string>()

  private getter = new Getters()

  userData:any
  dogs: any[] = []

  userService = inject(UsersService);
  

  formatBirthDate = formatBirthDate;
  getAge = getAge;
  getSexSymbol = getSexSymbol;
  getSexLabel = getSexLabel;

  async ngOnInit() {
    this.userData = await this.userService.getUser(this._id())
    this.dogs = await this.getter.getDogs(filterDogs({idOwner: this._id()}, 0, 10))
    console.log(this.userData);
    console.log(this.dogs);
    
    
  }




}