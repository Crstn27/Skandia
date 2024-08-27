import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'host-component',
  template: `<shared-alert (isOpen)="onAlertOpen()"></shared-alert>`
})
class HostComponent {
  alertOpened = false;

  onAlertOpen() {
    this.alertOpened = true;
  }
}

describe('AlertComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;
  let alertComponent: AlertComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [AlertComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    alertComponent = fixture.debugElement.query(By.directive(AlertComponent)).componentInstance;
  });

  it('Deberia crear el componente', () => {
    expect(alertComponent).toBeTruthy();
  });

  it('Deberia emitir el evento isOpen', () => {
    spyOn(hostComponent, 'onAlertOpen');

    alertComponent.isOpen.emit();

    expect(hostComponent.onAlertOpen).toHaveBeenCalled();
    expect(hostComponent.alertOpened).toBeTrue();
  });
});
