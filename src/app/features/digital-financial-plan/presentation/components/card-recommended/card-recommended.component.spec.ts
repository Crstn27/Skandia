import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecommendedComponent } from './card-recommended.component';
import { MatCardModule } from '@angular/material/card';

describe('CardRecommendedComponent', () => {
  let component: CardRecommendedComponent;
  let fixture: ComponentFixture<CardRecommendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRecommendedComponent, MatCardModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
