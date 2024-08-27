import { Component, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'shared-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  isOpen : OutputEmitterRef<void> = output<void>();

}
