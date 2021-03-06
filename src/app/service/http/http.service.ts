import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  // common http methods declared for the whole project

  public get(api: string, params?: any): Observable<any> {
    return this.http.get(api, { params: params }).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
