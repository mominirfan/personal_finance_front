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

  constructor(
    private homepageRepo: HomepageRepository,
  ) { }

  ngOnInit() {

    this.homepageRepo.getBills().subscribe((bills) => {
      this.bills = bills;
    //   console.log(this.bills);
    //   let suggOne = -1;
    //   let suggTwo = -1;
    //   let amts = [];
    //   for (const bill of this.bills) {
    //     amts.push(+bill.amt);
    //  }
    //  amts.sort((a, b) => a - b);
    //  suggOne = amts[amts.length - 1];
    //  suggOne = amts[amts.length - 2];

     this.homepageRepo.getSuggestions('coke').subscribe((suggestions) => {
      this.suggestionsOne = suggestions;
      console.log(this.suggestionsOne);
    });

    this.homepageRepo.getSuggestions('booze').subscribe((suggestions) => {
      this.suggestionsTwo = suggestions;
      console.log(this.suggestionsTwo);
    });
    this.name = this.bills[0].userName;

    });


    this.balance = 42069;

  }

}
