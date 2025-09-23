import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.scss'
})
export class Loading {
  @Input() message: string = 'Cargando...';
  @Input() type: 'spinner' | 'bones' | 'dog-running' | 'simple' = 'bones';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
