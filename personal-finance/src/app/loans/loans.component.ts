import { Component, OnInit } from '@angular/core';
import { Loan } from '../domain/models/loan';
import { LoanRepository } from '../domain/repositories/loan-repository.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  loans: Loan[];
  newLoan: Loan = {};
  currentUser: any = {};
  userName: String = '';

  constructor(
    private loanRepo: LoanRepository,
    private modalService: NgbModal
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = this.currentUser.userName;
    this.newLoan.userName = this.userName;
    this.newLoan.paid = 0;
  }

  ngOnInit() {
    this.loanRepo.getAllLoans(this.userName).subscribe((loans) => {
      this.loans = loans;
      console.log(this.loans);
    });
  }

  addLoan() {
    this.newLoan.loanPayment = this.newLoan.loanAmount * this.newLoan.interest / 12;
    this.newLoan.loanPayment = Math.round(100 * this.newLoan.loanPayment) / 100;
    this.loans.push(this.newLoan);
    this.loanRepo.addLoan(this.newLoan, this.userName).subscribe(() => {
      console.log(this.newLoan);
    });
    this.newLoan = {};
    this.newLoan.userName = this.currentUser;
  }

  makePayment(loan: Loan) {
    loan.paid = 1;
    this.loanRepo.updateLoan(loan, this.userName).subscribe(() => {
    });
    this.loanRepo.subtractFromBal(loan, this.userName).subscribe(() => {
    });
  }
}
