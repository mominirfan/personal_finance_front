import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanRepository {

  protected endpoint = 'http://ec2-3-16-30-192.us-east-2.compute.amazonaws.com:8080/api/get-loans/';
  protected orderedendpoint = 'http://ec2-3-16-30-192.us-east-2.compute.amazonaws.com:8080/api/order-loans/';

  constructor (private httpClient: HttpClient) {}

  getLoans(userName: String): Observable<Loan[]> {
    return this.httpClient.get<Loan[]>(`${this.endpoint}${userName}`);
  }

}
