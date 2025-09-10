import { Component, inject, input  } from '@angular/core';
import { DogsService } from '../../../core/services/dogs.service';
import { getAge, getSexLabel } from '../../../core/functions/converters-formarters';

@Component({
  selector: 'app-dog-details',
  standalone: false,
  templateUrl: './dog-details.html',
  styleUrl: './dog-details.scss'
})
export class DogDetails {
  _id = input.required<string>();
  dogData:any;

  getAge = getAge;
  getSexLabel = getSexLabel;
  
  private dogService = inject(DogsService);

  async ngOnInit() {
    this.dogData = await this.dogService.getDog(this._id());
    console.log(this.dogData);
    
  }
  
}