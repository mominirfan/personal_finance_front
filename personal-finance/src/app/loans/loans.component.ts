import { Component, OnInit, Input } from '@angular/core';
import { Loan } from '../domain/models/loan';
import { LoanRepository } from '../domain/repositories/loan-repository.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  // dates: Date[];

  @Input() index: number;

  @Input() selectedIndex: number;

  constructor(
    private loanRepo: LoanRepository,
    private modalService: NgbModal,
    private router: Router,
  ) {
    this.newLoan.paid = 0;
    // const d = new Date();
    // let month = d.getMonth();
    // let year = d.getFullYear();

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
      // for(i = 0 ; i < this.loans.length)
      console.log(this.loans);
    });
  }

  addLoan(loanForm: NgForm) {
    this.newLoan.loanBalance = this.newLoan.loanAmount;
    this.newLoan = this.loanRepo.calculateLoanStats(this.newLoan);
    this.newLoan.loanPaidAmt = 0;
    this.loanRepo.addLoan(this.newLoan, this.userName).subscribe(() => {
      this.loans.push(this.newLoan);
      this.newLoan = new Loan();
      loanForm.reset();
    this.newLoan.userName = this.currentUser;
    });
  }

  minPayment(loan: Loan) {
    loan.paid = 1;

    loan.loanBalance = +loan.loanBalance - +loan.loanPayment;
    loan.loanPaidAmt = +loan.loanPaidAmt + +loan.loanPayment;
    this.loanRepo.updateLoan(loan, this.userName).subscribe(() => {
      this.loanRepo.updatePaidLoan(loan, this.userName).subscribe(() => {
        this.loanRepo.subtractFromBal(loan.loanPayment, this.userName).subscribe(() => {
          this.payLoan = 0;
        });
      });
    });
  }

  payCustom(loan: Loan, indx: number) {
    loan.paid = 1;
    loan.loanBalance = +loan.loanBalance - +this.payLoan;
    loan.loanPaidAmt = +loan.loanPaidAmt + +this.payLoan;

    loan = this.loanRepo.calculateLoanStats(loan);

    this.loanRepo.updateLoan(loan, this.userName).subscribe(() => {
      this.loanRepo.updatePaidLoan(loan, this.userName).subscribe(() => {
        this.loanRepo.subtractFromBal(this.payLoan, this.userName).subscribe(() => {
          this.payLoan = 0;
          console.log("here");
          console.log(loan.loanBalance);
          if (loan.loanBalance <= 0) {
            this.loans.splice(indx, 1);
            console.log(this.loans);
          }
        });
      });

    });




  }
}
