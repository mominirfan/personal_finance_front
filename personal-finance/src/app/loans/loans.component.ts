import { Component, OnInit, Input } from '@angular/core';
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
  newLoan: Loan = new Loan();
  currentUser: any = {};
  userName: String = '';
  payLoan: number;

  @Input() index: number;

  @Input() selectedIndex: number;

  constructor(
    private loanRepo: LoanRepository,
    private modalService: NgbModal
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userName = this.currentUser.userName;
    this.newLoan.userName = this.userName;
    this.newLoan.paid = 0;
    this.payLoan = 0;
  }

  ngOnInit() {
    this.loanRepo.getAllLoans(this.userName).subscribe((loans) => {
      this.loans = loans;
      console.log(this.loans);
    });
  }

  addLoan() {
    this.newLoan.loanBalance = this.newLoan.loanAmount;
    this.newLoan = this.loanRepo.calculateLoanStats(this.newLoan);
    this.newLoan.loanPaidAmt = 0;
    this.loanRepo.addLoan(this.newLoan, this.userName).subscribe(() => {
      this.loans.push(this.newLoan);
      this.newLoan = new Loan();
    this.newLoan.userName = this.currentUser;
    });

  }

  // makePayment(loan: Loan) {
  //   loan.paid = 1;
  //   this.loanRepo.updateLoan(loan, this.userName).subscribe(() => {
  //   });
  //   this.loanRepo.subtractFromBal(loan, this.userName).subscribe(() => {
  //   });
  // }

  minPayment(loan: Loan) {
    loan.paid = 1;

    // the loan balance won't be changed since we paid the minimum amount
    // loan.loanBalance = loan.loanBalance - loan.loanPayment;

    loan.loanPaidAmt = loan.loanPaidAmt + loan.loanPayment;
    this.loanRepo.updateLoan(loan, this.userName).subscribe(() => {
    });
    this.loanRepo.subtractFromBal(loan.loanPayment, this.userName).subscribe(() => {
    });
  }

  payCustom(loan: Loan) {
    loan.paid = 1;
    loan.loanBalance = loan.loanBalance - this.payLoan;
    loan.loanPaidAmt = loan.loanPaidAmt + this.payLoan;

    loan = this.loanRepo.calculateLoanStats(loan);


    this.loanRepo.updateLoan(loan, this.userName).subscribe(() => {
    });
    this.loanRepo.subtractFromBal(this.payLoan, this.userName).subscribe(() => {
    });


  }
}
