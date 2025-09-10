import { Component, Input, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-breeds',
  standalone: false,
  templateUrl: './breeds.component.html',
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}],
  styleUrl: './breeds.component.scss'
})
export class BreedsComponent {
  // @Input() formGroup!: FormGroup
  @Input() breeds!: any

  constructor(
    @Optional() @SkipSelf() private controlContainer: ControlContainer
  ){

  }
  ngOnInit(){
    console.log('Soyu breeds');
    
  }

}
