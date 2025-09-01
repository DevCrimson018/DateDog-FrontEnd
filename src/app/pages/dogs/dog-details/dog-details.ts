import { Component, inject, input, Input  } from '@angular/core';
import { DogsService } from '../../../core/services/dogs.service';

@Component({
  selector: 'app-dog-details',
  standalone: false,
  templateUrl: './dog-details.html',
  styleUrl: './dog-details.scss'
})
export class DogDetails {
  _id = input.required<string>();
  dogData:any;

  private dogService = inject(DogsService);

  async ngOnInit() {
    this.dogData = await this.dogService.getDog(this._id());
    console.log(this.dogData);
    
  }
  
}