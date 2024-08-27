import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardInfoComponent } from './card-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InfoCard } from '../../../models/card-info-model';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'host-component',
  template: `<digital-financial-plan-card-info [dataCard]="testCard"></digital-financial-plan-card-info>`
})
class HostComponent {
  testCard: InfoCard = {
    "nameProduct": "MFUND",
    "numberProduct": "789654123",
    "balanceProduct": "4000000",
    "detaildProduct": "Ya tienes un 15% de tu objetivo "
    };
}

describe('CardInfoComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;
  let cardInfoComponent: CardInfoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [
        CardInfoComponent,
        MatCardModule,
        MatIconModule,
        MatCheckboxModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    cardInfoComponent = fixture.debugElement.query(By.directive(CardInfoComponent)).componentInstance;
  });

  it('Deberi crear el elemento', () => {
    expect(cardInfoComponent).toBeTruthy();
  });

  it('Deberia recibir correctamente los datos de entrada', () => {
    expect(cardInfoComponent.dataCard()).toEqual(hostComponent.testCard);
  });

  it('Deberia renderizar el titulo de la tarjeta', () => {
    const cardTitleElement = fixture.debugElement.query(By.css('.mat-card-title')).nativeElement;
    expect(cardTitleElement.textContent).toContain(hostComponent.testCard.nameProduct);
  });

  it('Deberia renderizar el numero del producto de la tarjeta', () => {
    const cardTitleElement = fixture.debugElement.query(By.css('.mat-card-subtitle')).nativeElement;
    expect(cardTitleElement.textContent).toContain(hostComponent.testCard.numberProduct);
  });

  it('Deberia renderizar el balance del producto de la tarjeta', () => {
    const cardDescriptionElement = fixture.debugElement.query(By.css('.mat-card-content')).nativeElement;
    expect(cardDescriptionElement.textContent).toContain(hostComponent.testCard.balanceProduct);
  });

  it('Deberia renderizar la descripcion de la tarjeta', () => {
    const cardDescriptionElement = fixture.debugElement.query(By.css('.mat-card-content')).nativeElement;
    expect(cardDescriptionElement.textContent).toContain(hostComponent.testCard.detaildProduct);
  });

});
