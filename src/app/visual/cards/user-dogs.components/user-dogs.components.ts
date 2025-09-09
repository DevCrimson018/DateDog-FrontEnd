import { Component, Input } from '@angular/core';
import { getAge, getSexLabel, getSexSymbol } from '../../../core/functions/converters-formarters';

@Component({
  selector: 'app-user-dogs',
  standalone: false,
  templateUrl: './user-dogs.components.html',
  styleUrl: './user-dogs.components.scss'
})
export class UserDogsComponents {
  @Input() dog:any

  getSexSymbol = getSexSymbol;
  getSexLabel = getSexLabel;
  getAge = getAge;
}
