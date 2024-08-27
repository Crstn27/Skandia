import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpMock = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: HttpClient, useValue: httpMock }
      ]
    });

    service = TestBed.inject(ApiService);
  });

  it('Deberia hacer una peticion get con la URL correcta', () => {
    const path = '/api/data';
    service.get<any>(path).subscribe();

    expect(httpMock.get).toHaveBeenCalledWith(`${service['baseUrl']}${path}`);
  });

  it('Deberia retornar una respuesta correcta', () => {
    const mockResponse = new HttpResponse<any>({ status: 200, body: { data: 'sample data' } });
    httpMock.get.and.returnValue(of(mockResponse));

    service.get<any>('/api/data').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });
  });

  it('Deberia gestionar los errores', () => {
    const errorMessage = 'Error occurred';
    httpMock.get.and.returnValue(throwError(() => new Error(errorMessage)));

    service.get<any>('/api/data').subscribe(
      () => fail('Expected an error'),
      error => {
        expect(error.message).toBe(errorMessage);
      }
    );
  });
});
