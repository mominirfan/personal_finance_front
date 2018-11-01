import { Component, OnInit } from '@angular/core';
import { BuiltinFunctionCall } from '@angular/compiler/src/compiler_util/expression_converter';
import { Bill } from '../domains/models/bill';
import { Suggestion } from '../domains/models/suggestion';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  bills: Bill[];
  name: string;
  suggestions: Suggestion[];
  balance: number;

  constructor() { }

  ngOnInit() {
    this.bills = [
      { type: 'Cocaine', cost: 120, date: 'May 8, 1919' },
      { type: 'Divorce Papers', cost: 10000, date: 'May 8, 1822' },
      { type: 'Rocket Fuel', cost: 10000, date: 'July 20, 1969' },
    ];

    this.suggestions = [
      {text: 'Don\'t do cocaine'},
      {text: 'Buy Hulu'},
      {text: 'Stop buying pumpkin spice lattes'},
      {text: 'Drop out of college (you\'ll save so fucking much)'},


    ];

    this.name = 'Mike Hunt';
    this.balance = 42069;

  }

}
