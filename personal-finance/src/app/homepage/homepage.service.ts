import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Bill } from '../domains/models/bill';

@Injectable()
export class HomepageService {

  // protected endPoint = 'https://api.johnlawrimore.com/directory/accounts';
  protected endPoint = 'https://2a8cdaca-f45e-41a6-86ba-99d206d34752.mock.pstmn.io';
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) {}

  test(): Observable<Bill> {
    return this.httpClient
      .get<Bill>(`${this.endPoint}`, this.httpOptions); // the get had to have <Account> to make it work
      // .pipe(catchError(this.handleException));
  }

  // add(account: Account): Observable<Account> {
  //   return this.httpClient
  //     .post<Account>(this.endPoint, account, this.httpOptions)
  //     .pipe(catchError(this.handleException));
  // }

  // update(id: number, account: Account): Observable<Account> {
  //   return this.httpClient
  //     .put<Account>(`${this.endPoint}/${id}`, account, this.httpOptions)
  //     .pipe(catchError(this.handleException));
  // }

  // exception.message is what you use, not exeption.body.message like we did previously in class
  // protected handleException(exception: any) {
  //   var message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
  //   alert(message);
  //   return Observable.throw(exception);
  // }
}
