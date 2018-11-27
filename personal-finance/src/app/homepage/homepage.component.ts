import { Component, OnInit } from '@angular/core';
import { BuiltinFunctionCall } from '@angular/compiler/src/compiler_util/expression_converter';
import { Bill } from '../domain/models/bill';
import { Suggestion } from '../domain/models/suggestion';
import { HomepageRepository } from '../domain/repositories/homepage-repository.service';
import { Loan } from '../domain/models/loan';
import { LoanRepository } from '../domain/repositories/loan-repository.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  loans: Loan[];
  loansBool: boolean;
  name: string;
  suggestions: Suggestion[];
  suggestionsOne: Suggestion[];
  suggestionsTwo: Suggestion[];
  balance: string;
  currentUser: any = { };
  bills: Bill[];
  billsBool: boolean;
  constructor(
    private homepageRepo: HomepageRepository,
    private loansRepo: LoanRepository,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.balance = JSON.parse(localStorage.getItem('balance'));

    if (!this.currentUser) {
      this.router.navigate(['login']);
      return;
    }
    this.name = this.currentUser.userName;

    this.homepageRepo.getBills(this.currentUser.userName).subscribe((bills) => {
       this.bills = bills;
       this.billsBool = true;
       if (this.bills.length  < 1) {
         this.billsBool = false;
       }
   });
    this.loansRepo.getDashboardLoans(this.currentUser.userName).subscribe((loans) => {
      this.loans = loans;

     this.homepageRepo.getSuggestions(this.currentUser.userName).subscribe((suggestions) => {
      this.suggestions = suggestions;
      this.suggestionsOne = [];
      this.suggestionsTwo = [];
      for (let i = 0; i < 4; i++) {
        this.suggestionsOne.push(this.suggestions[i]);
      }
      for (let i = 4; i < 9; i++) {
        this.suggestionsTwo.push(this.suggestions[i]);
      }
      console.log(this.suggestionsOne);
      console.log(this.suggestionsTwo);
    });

    this.loansBool = true;
    if (this.loans.length  < 1) {
      this.loansBool = false;
    }

    });

  }

  toLoans() {
    this.router.navigate(['loans']);

  }

}
