import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: false,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  @Input() message: string = 'Cargando...';
  @Input() type: 'spinner' | 'bones' | 'dog-running' | 'simple' = 'bones';
  @Input() size: 'extraSmall' | 'small' | 'medium' | 'large' = 'medium';
}
