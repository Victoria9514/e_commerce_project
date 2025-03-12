import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);

  get<T>(
    url: string,
    options?: {
      headers: HttpHeaders;
    }
  ): Observable<T> {
    return this.http.get<T>(url, options);
  }

  post<T, P>(
    body: P,
    url: string,
    options?: {
      headers: HttpHeaders;
    }
  ): Observable<T> {
    return this.http.post<T>(url, body, options);
  }

  put<T, P>(
    url: string,
    body: P,
    param?: string | number,
    options?: {
      headers: HttpHeaders;
    }
  ): Observable<T> {
    return param
      ? this.http.put<T>(`${url}/${param}`, body, options)
      : this.http.put<T>(`${url}`, body, options);
  }

  delete<T>(
    url: string,
    param?: string | number,
    options?: {
      headers: HttpHeaders;
    }
  ): Observable<T> {
    return param
      ? this.http.delete<T>(`${url}/${param}`, options)
      : this.http.delete<T>(`${url}`, options);
  }

  getById(endPoint: string, id: string | number): Observable<unknown> {
    return this.http.get(`${endPoint}/${id}`);
  }
}
