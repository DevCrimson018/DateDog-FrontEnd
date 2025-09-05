import { Component, Input } from '@angular/core';
import { formatBirthDate, getAge } from '../../../core/functions/converters-formarters';

@Component({
  selector: 'app-dogs-filtered',
  standalone: false,
  templateUrl: './dogs-filtered.component.html',
  styleUrl: './dogs-filtered.component.scss'
})
export class DogsFilteredComponent {
  @Input() dog: any

  formatBirthDate = formatBirthDate;
  
  getAge = getAge;

}


