import { Component, inject, input } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { DogsService } from '../../../core/services/dogs.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss'
})
export class UserDetails {
  // Datos del usuario (ejemplo)
  _id = input.required<string>()

  userData:any
  dogs: any[] = []

  userService = inject(UsersService);
  dogService = inject(DogsService)

  async ngOnInit() {
    this.userData = await this.userService.getUser(this._id())
    this.dogs = await this.dogService.filterDogs(
      {
        filter:{
          idOwner: this._id
        },
        skip: 0,
        limit: 10
      }
    )
    console.log(this.userData);
    console.log(this.dogs);
    
    
  }

  getSexSymbol(sex: string): string {
    return sex === 'Macho' ? '♂' : '♀';
  }

  getSexLabel(sex: string): string {
    return sex === 'Macho' ? 'Macho' : 'Hembra';
  }
}