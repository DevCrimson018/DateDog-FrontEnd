import { Component, inject } from '@angular/core';
import { DogsService } from '../../../core/services/dogs.service';
import { filterDogs } from '../../../core/models/filters';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  nearbyDogs: any[] = [];
  
  showMapView = false;
  selectedDog: any = null;
  loading: boolean = true;
  
  private dogService = inject(DogsService);



  async ngOnInit() {
    await this.getNearByDogs();
  }

  async getNearByDogs() {
    try {
      this.loading = true;
      this.nearbyDogs = await this.dogService.nearByDogs(filterDogs({}, 0, 10));
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  }
}