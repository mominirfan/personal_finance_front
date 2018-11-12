import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanRepository {

  protected endpoint = 'http://ec2-3-16-30-192.us-east-2.compute.amazonaws.com:8080/api/get-loans/';
  protected dashboardEndpoint = 'http://ec2-3-16-30-192.us-east-2.compute.amazonaws.com:8080/api/order-loans/';
  protected addLoanEndpoint = '';
  protected updateLoanEndpoint = '';

  constructor (private httpClient: HttpClient) {}

  getAllLoans(userName: String): Observable<Loan[]> {
    return this.httpClient.get<Loan[]>(`${this.endpoint}${userName}`);
  }

  getDashboardLoans(userName: String): Observable<Loan[]> {
    return this.httpClient.get<Loan[]>(`${this.dashboardEndpoint}${userName}`);
  }

  addLoan(loan: Loan, userName: String) {
    return this.httpClient.post<any>(`${this.addLoanEndpoint}${userName}`, { userName: userName, loan: loan });
  }

  updateLoan(loan: Loan, userName: String) {
    return this.httpClient.put<any>(`${this.updateLoanEndpoint}${userName}`, { userName: userName, loan: loan });
  }
}
