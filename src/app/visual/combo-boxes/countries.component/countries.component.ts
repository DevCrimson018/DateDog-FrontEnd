import { Component, EventEmitter, Input, Optional, Output, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-countries',
  standalone: false,
  templateUrl: './countries.component.html',
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}],
  styleUrl: './countries.component.scss'
})
export class CountriesComponent {
  @Input() countries!: any
  @Input() loading: boolean = false;
  @Output() sending = new EventEmitter<any>()

  constructor(
    @Optional() @SkipSelf() private controlContainer: ControlContainer
  ){

  }

  
  ngOnInit(){
    console.log('Soy Country');
    
  }


  getProvinces(){
    this.sending.emit()
  }
}
