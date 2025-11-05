import { Component, inject, input  } from '@angular/core';
import { DogsService } from '../../../core/services/dogs.service';
import { getAge, getSexLabel } from '../../../core/functions/converters-formarters';
import { Validators } from '../../../core/functions/validators';

@Component({
  selector: 'app-dog-details',
  standalone: false,
  templateUrl: './dog-details.html',
  styleUrl: './dog-details.scss'
})
export class DogDetails {
  loading:boolean = false
  _id = input.required<string>();
  dogData:any;
  isOwner:boolean = false;

  getAge = getAge;
  getSexLabel = getSexLabel;
  
  private dogService = inject(DogsService);
  private val = new Validators;

  async ngOnInit() {
    this.loading = true
    
    this.dogData = await this.dogService.getDog(this._id());
    console.log(this.dogData);
    this.loading = false
  }

  async validateIsOwner(){
    this.isOwner = await this.val.checkIsOwner(this._id())
  }
  
}