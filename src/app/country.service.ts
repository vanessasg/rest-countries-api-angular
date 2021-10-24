import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Country } from './country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  endpoint = 'https://restcountries.com/v2/name/';

  constructor(private http: HttpClient) {}

  private handleHerror(err: HttpErrorResponse | any) {
    let errMsg = '';
    if (err.error instanceof ErrorEvent) {
      errMsg = err.error;
    } else {
      errMsg = err.statusText || '';
    }
    return throwError(errMsg);
  }

  getAllCountries(): Observable<Country[]> {
    return this.http
      .get<Country[]>('https://restcountries.com/v2/all')
      .pipe(catchError(this.handleHerror), retry(3));
  }

  getCountryInfo(name: string): Observable<Country> {
    return this.http.get<Country>(this.endpoint + name);
  }
}
