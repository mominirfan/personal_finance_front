import { Budget } from './../models/budget';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class BudgetEditRepository {

  protected endPoint = 'http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/get-budgets';
  protected endPoint2 = 'http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/add-budget';
  protected endPoint3 = 'http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/edit-budget';
  protected depositEndpoint = 'http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/increment-bal';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'johnlawrimore'
    })
  };

  constructor(
    protected httpClient: HttpClient
  ) {}

  public getBudget(username: string): Observable<[{}]> {
    return this.httpClient.get<[{}]>(`${this.endPoint}/${username}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  public addBudget(budget: {}): Observable<{}> {
    return this.httpClient.post<{}>(`${this.endPoint2}`, budget, this.httpOptions)
    .pipe(catchError(this.handleException));
  }

  public editBudget(budget: {}): Observable<{}> {
    return this.httpClient.put<{}>(`${this.endPoint3}`, budget, this.httpOptions)
    .pipe(catchError(this.handleException));
  }


  addDeposit(depositAmt: Number, userName: String) {
    return this.httpClient.put<any>(`${this.depositEndpoint}`, { 'userName': String(userName), 'change': String(depositAmt) });
  }

  protected handleException(exception: any) {
    var message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }
}
