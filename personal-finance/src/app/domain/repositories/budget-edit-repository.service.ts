import { Budget } from './../models/budget';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class BudgetEditRepository {

  protected endPoint = '';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'johnlawrimore'
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) {}

  public getBudget(): Observable<Budget> {
    return this.httpClient.get(this.endPoint, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  public createBudget(budget: Budget): Observable<Budget> {
    return this.httpClient.post(this.endPoint, budget, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  public updateBudget(id: number, budget: Budget): Observable<Budget> {
    return this.httpClient.put(`${this.endPoint}/${id}`, budget, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    var message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}

}
