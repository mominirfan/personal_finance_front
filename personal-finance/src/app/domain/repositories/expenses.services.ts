import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class ExpensesService {

  protected getAllExpensesEndpoint = 'http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/get-expenses';
  // protected endPoint2 = 'http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/edit-budget';

  // protected httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'johnlawrimore'
  //   })
  // };

  constructor( protected httpClient: HttpClient ) {
  }

  public getExpenses(username: String) {
    return this.httpClient.get<[{}]>(`${this.getAllExpensesEndpoint}/${username}`)
    .pipe(catchError(this.handleException));
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }


}
