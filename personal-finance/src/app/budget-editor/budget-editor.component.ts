import { Budget } from '../domain/models/budget';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-editor',
  templateUrl: './budget-editor.component.html',
  styleUrls: ['./budget-editor.component.css']
})
export class BudgetEditorComponent implements OnInit {

  curBudget: Budget;
  newBudget: Budget = {};

  constructor() { }

  ngOnInit() {
  }

}
