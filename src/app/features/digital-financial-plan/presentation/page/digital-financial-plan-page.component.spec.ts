import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DigitalFinancialPlanPageComponent } from './digital-financial-plan-page.component';
import { ApiService } from '../../../../shared/services/api-service/api.service';
import { of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DigitalFinancialPlanPageComponent', () => {
  let component: DigitalFinancialPlanPageComponent;
  let fixture: ComponentFixture<DigitalFinancialPlanPageComponent>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    //Crear un spy for the ApiService
    apiServiceMock = jasmine.createSpyObj('ApiService', ['get']);

    await TestBed.configureTestingModule({
      imports: [DigitalFinancialPlanPageComponent],
      providers: [{ provide: ApiService, useValue: apiServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalFinancialPlanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia cargar la data en el ngOnInit', () => {
    const mockData: HttpResponse<any> = new HttpResponse({
      status: 200,
      body: { listCard: [] }
    });
    apiServiceMock.get.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(apiServiceMock.get).toHaveBeenCalledWith('/cards');
    expect(component.isLoading()).toBe(false);
    expect(component.signalData().listCard).toEqual([]);
  });

  it('Deberia gestionar el error en la carga de datos', () => {
    apiServiceMock.get.and.returnValue(throwError(() => new Error('Error occurred')));

    component.ngOnInit();

    expect(apiServiceMock.get).toHaveBeenCalledWith('/cards');
    expect(component.isError()).toBe(true);
    expect(component.isLoading()).toBe(false);
  });

  it('Deberia hacer scroll a la siguiente card', () => {
    const scrollSpy = spyOn(component.carousel()?.nativeElement, 'scrollBy');
    component.scrollCarousel('next');
    expect(scrollSpy).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' });
  });

  it('Deberia hacer scroll a la anterior card', () => {
    const scrollSpy = spyOn(component.carousel()?.nativeElement, 'scrollBy');
    component.scrollCarousel('prev');
    expect(scrollSpy).toHaveBeenCalledWith({ left: -300, behavior: 'smooth' });
  });

  it('Deberia comprobar correctamente los estados de los botones de desplazamiento y actualizacion', () => {
    const containerMock = { scrollLeft: 0, scrollWidth: 600, clientWidth: 300 };
    spyOn(component.carousel(), 'nativeElement').and.returnValue(containerMock);

    component.checkScroll();

    expect(component.isScrollLeftDisabled()).toBe(true);
    expect(component.isScrollRightDisabled()).toBe(false);
  });
});
