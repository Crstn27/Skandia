import { ChangeDetectionStrategy, Component, input, InputSignal, model} from '@angular/core';
import { InfoCard } from '../../../models/card-info-model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'digital-financial-plan-card-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss',
})
export class CardInfoComponent {

  dataCard : InputSignal<InfoCard> = input.required<InfoCard>();

}
