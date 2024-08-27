import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = env.urlBase;

  constructor(private http: HttpClient) {}

  get<T>(path: string): Observable<HttpResponse<any>> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { observe: 'response' });
  }


}
