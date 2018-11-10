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
  }

  ngOnInit() {
    this.loanRepo.getAllLoans(this.userName).subscribe((loans) => {
      this.loans = loans;
      console.log(this.loans);
    });
  }
}
