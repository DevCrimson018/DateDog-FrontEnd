import { Component, EventEmitter, Input, Optional, Output, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-provinces',
  standalone: false,
  templateUrl: './provinces.component.html',
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}],
  styleUrl: './provinces.component.scss'
})
export class ProvincesComponent {
  @Input() provinces!: any
  @Input() loading: boolean = false
  @Output() sending = new EventEmitter<any>()

  constructor(
    @Optional() @SkipSelf() private controlContainer: ControlContainer
  ){

  }

  getCities(){
    this.sending.emit();
  }
}
