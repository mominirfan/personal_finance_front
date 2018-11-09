import { Component, OnInit } from '@angular/core';
import { Loan } from '../domain/models/loan';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  loans: Loan;
  constructor() { }

  ngOnInit() {
  }

}
