import { Component, OnInit } from '@angular/core';
import { BuiltinFunctionCall } from '@angular/compiler/src/compiler_util/expression_converter';
import { Bill } from '../domain/models/bill';
import { Suggestion } from '../domain/models/suggestion';
import { HomepageRepository } from '../domain/repositories/homepage-repository.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  bills: Bill[];
  name: string;
  suggestionsOne: Suggestion[];
  suggestionsTwo: Suggestion[];
  balance: number;
  currentUser: any = {};

  constructor(
    private homepageRepo: HomepageRepository,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.name = this.currentUser.userName;
  }

  ngOnInit() {

    this.homepageRepo.getBills(this.currentUser.userName).subscribe((bills) => {
      this.bills = bills;
      console.log(this.bills);

     this.homepageRepo.getSuggestions('coke').subscribe((suggestions) => {
      this.suggestionsOne = suggestions;
      console.log(this.suggestionsOne);
    });

    this.homepageRepo.getSuggestions('booze').subscribe((suggestions) => {
      this.suggestionsTwo = suggestions;
      console.log(this.suggestionsTwo);
    });

    });


    this.balance = 42069;

  }

}
