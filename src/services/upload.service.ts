import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class UploadService {
  private apiEndPoint: string = 'http://localhost:3300/uploads';

  constructor(private http: HttpClient) {}

  predict(formData: FormData): Observable<{}> {
    let headers = new Headers();
    return this.http.post(`${this.apiEndPoint}`, formData);
  }
}
