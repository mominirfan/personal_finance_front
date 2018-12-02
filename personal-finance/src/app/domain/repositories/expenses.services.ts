import { Expense } from "./../models/expense";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class ExpensesService {
  protected getAllExpensesEndpoint =
    "http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/get-expenses";
  protected addExpenseEndpoint =
    "http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/add-expense";
  protected getSummedExpenses =
    "http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/get-total-spending";


  constructor(protected httpClient: HttpClient) {}

  public getExpenses(username: String) {
    return this.httpClient
      .get<[{}]>(`${this.getAllExpensesEndpoint}/${username}`)
      .pipe(catchError(this.handleException));
  }

  public getExpenseSum(username: String) {
    return this.httpClient
      .get<[{}]>(`${this.getSummedExpenses}/${username}`)
      .pipe(catchError(this.handleException));
  }

  public addExpense(ex: Expense) {
    return this.httpClient
      .post<[{}]>(`${this.addExpenseEndpoint}`, ex)
      .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${
      exception.message
    }`;
    alert(message);
    return Observable.throw(exception);
  }
}
