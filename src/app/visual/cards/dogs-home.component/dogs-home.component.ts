import { Component, Input } from '@angular/core';
import { formatBirthDate, getAge, getSexLabel } from '../../../core/functions/converters-formarters';

@Component({
  selector: 'app-dogs-home',
  standalone: false,
  templateUrl: './dogs-home.component.html',
  styleUrl: './dogs-home.component.scss'
})
export class DogsHomeComponent {
  @Input() dog: any

  formatBirthDate = formatBirthDate;
    
  getAge = getAge;

  getSexLabel = getSexLabel;
  
}
