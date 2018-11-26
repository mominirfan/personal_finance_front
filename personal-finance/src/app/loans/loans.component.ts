import { Component, OnInit, Input } from '@angular/core';
import { Loan } from '../domain/models/loan';
import { LoanRepository } from '../domain/repositories/loan-repository.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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
    private modalService: NgbModal,
    private router: Router,
  ) {
    this.newLoan.paid = 0;
    this.payLoan = 0;
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.currentUser) {
      this.router.navigate(['login']);
      return;
    }
    this.userName = this.currentUser.userName;
    this.newLoan.userName = this.userName;

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

  minPayment(loan: Loan) {
    console.log("minpayment");
    // console.log("first");
    console.log(loan);
    loan.paid = 1;

    // the loan balance won't be changed since we paid the minimum amount
    loan.loanBalance = +loan.loanBalance - +loan.loanPayment;

    loan.loanPaidAmt = +loan.loanPaidAmt + +loan.loanPayment;
    console.log(loan.loanPaidAmt);
    console.log(loan.loanPayment);
    this.loanRepo.updateLoan(loan, this.userName).subscribe(() => {
      this.loanRepo.updatePaidLoan(loan, this.userName).subscribe(() => {
        this.loanRepo.subtractFromBal(loan.loanPayment, this.userName).subscribe(() => {
        });
      });

    });



  }

  payCustom(loan: Loan) {
    // console.log("first");
    console.log("fuckkkkk payCustom");
    console.log(loan);
    loan.paid = 1;
    loan.loanBalance = +loan.loanBalance - +this.payLoan;
    loan.loanPaidAmt = +loan.loanPaidAmt + +this.payLoan;

    loan = this.loanRepo.calculateLoanStats(loan);
    // console.log("second");
    // console.log(loan);

    this.loanRepo.updateLoan(loan, this.userName).subscribe(() => {
      this.loanRepo.updatePaidLoan(loan, this.userName).subscribe(() => {
        this.loanRepo.subtractFromBal(this.payLoan, this.userName).subscribe(() => {
        });
      });

    });




  }
}
