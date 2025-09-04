import { Component, Input, Optional, Output, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-cities',
  standalone: false,
  templateUrl: './cities.component.html',
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}],
  styleUrl: './cities.component.scss'
})
export class CitiesComponent {

  @Input() cities!: any

  constructor(
    @Optional() @SkipSelf() private controlContainer: ControlContainer
  ){

  }



}
