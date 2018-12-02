import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Loan } from "../models/loan";

@Injectable({
  providedIn: "root"
})
export class LoanRepository {
  protected endpoint =
    "http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/get-loans/";
  protected dashboardEndpoint =
    "http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/order-loans/";
  protected addLoanEndpoint =
    "http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/add-loan";
  protected editLoanEndpoint =
    "http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/edit-loan";
  protected updateLoanEndpoint =
    "http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/update-loan";
  protected decrementEndpoint =
    "http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/decrement-bal";

  constructor(private httpClient: HttpClient) {}

  getAllLoans(userName: String): Observable<Loan[]> {
    return this.httpClient.get<Loan[]>(`${this.endpoint}${userName}`);
  }

  getDashboardLoans(userName: String): Observable<Loan[]> {
    return this.httpClient.get<Loan[]>(`${this.dashboardEndpoint}${userName}`);
  }

  calculateLoanStats(loan: Loan) {
    // Multiply loan amount by interest and divide by 12 to get min loan payment
    loan.loanPayment = (+loan.loanBalance * +loan.interest) / 12;
    loan.loanPayment = Math.round(100 * +loan.loanPayment) / 100;
    return loan;
  }
  addLoan(loan: Loan, userName: String) {
    return this.httpClient.post<any>(`${this.addLoanEndpoint}`, {
      userName: userName,
      loanName: loan.loanName,
      loanAmount: loan.loanAmount,
      interest: loan.interest,
      paymentDay: loan.paymentDay,
      loanPayment: loan.loanPayment,
      loanDescription: loan.loanDescription,
      loanPaidAmt: loan.loanPaidAmt,
      loanBalance: loan.loanBalance
    });
  }

  updateLoan(loan: Loan, userName: String) {
    return this.httpClient.put<any>(`${this.editLoanEndpoint}`, {
      userName: userName,
      loanName: loan.loanName,
      loanAmount: loan.loanAmount,
      interest: loan.interest,
      paymentDay: loan.paymentDay,
      loanPayment: loan.loanPayment,
      loanDescription: loan.loanDescription,
      loanPaidAmt: loan.loanPaidAmt,
      loanBalance: loan.loanBalance
    });
  }

  updatePaidLoan(loan: Loan, userName: String) {
    return this.httpClient.put<any>(`${this.updateLoanEndpoint}`, {
      userName: userName,
      loanName: loan.loanName,
      loanDescription: loan.loanDescription,
      paid: loan.paid
    });
  }

  subtractFromBal(payment: number, userName: String) {
    return this.httpClient.put<any>(`${this.decrementEndpoint}`, {
      userName: userName,
      change: payment
    });
  }
}
