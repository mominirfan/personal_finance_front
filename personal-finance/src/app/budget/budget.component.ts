import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Budget } from './../domain/models/budget';
import { BudgetEditRepository } from './../domain/repositories/budget-edit-repository.service';
import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../chart/canvasjs.min';
import { ExpensesService } from '../domain/repositories/expenses.services';
import { Expense } from '../domain/models/expense';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budget_labels = ['Savings', 'Misc.', 'House', 'Car', 'Fun', 'Util.', 'Food'];
  monthly_inc: number; // make this thier monthly income
  budget_vals = [1000, 500, 500, 500, 500, 500, 500];
  spend_vals = [500, 400, 400, 300, 400, 300, 500];
  budget = [];
  currentUser: any = {};
  balance: number;

  // Editor Members
  budg: Budget = {};
  newBudget: Budget = {};

  expenses: Expense[];
  depositAmt: number;

  constructor(
    private budgetRepo: BudgetEditRepository,
    private modalService: NgbModal,
    private expenseService: ExpensesService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.balance = JSON.parse(localStorage.getItem('balance'));

  }

  initBudgets() {
    this.budget_labels = [];
    this.budget_vals = [];
    let i;
    let label;
    let bud;
    for (i = 0 ; i < this.budget.length ; i++) {
      label = this.budget[i]['budgetType'];
      bud = this.budget[i]['amt'];
      this.budget_labels.push(label);
      this.budget_vals.push(bud);
    }
  }

  save() {
    let newVal = [];
    let i;
    let date = new Date();
    this.spend_vals = [];
    for (i = 0 ; i < this.budget_labels.length ; i++) {
      let amt = this.newBudget['food'];
      console.log(amt);
      this.spend_vals.push(amt);
      newVal.push(
        {
          userName: this.currentUser.userName,
          budgetType: this.budget_labels[i],
          active_date: date,
          amt: this.newBudget[this.budget_labels[i]]
        }
      );
    }

    this.budg = this.newBudget;
    this.newBudget = {};
    this.updateChart();
  }

  updateChart() {
    let i;
    let spend_points = [];
    let remain_points = [];

    for (i = 0 ; i < this.budget_labels.length ; i++) {
      spend_points.push({label: this.budget_labels[i], y: this.spend_vals[i]} );
    }

    for (i = 0 ; i < this.budget_labels.length ; i++) {
      remain_points.push({label: this.budget_labels[i], y: (this.budget_vals[i] - this.spend_vals[i])} );
    }

    let chart = new CanvasJS.Chart('chartContainer',
    {
      axisX: {
        gridThickness: 0
      },
      axisY: {
        gridThickness: 0
      },
      data: [
      {
        type: 'stackedBar',
        dataPoints: spend_points
      },
        {
        type: 'stackedBar',
         dataPoints: remain_points
      }


      ]
    });

    chart.render();

  }

  getExpenses() {
    this.expenseService.getExpenses(this.currentUser.userName).subscribe((expenses) => {
      this.expenses = expenses;
      console.log(this.expenses);
    });
  }

  ngOnInit() {

    this.budgetRepo.getBudget(this.currentUser.userName).subscribe((budget) => {
      this.budget = budget;

    this.monthly_inc = 5000;
    this.initBudgets();
    this.updateChart();
    this.getExpenses();

  });
}
  deposit() {
    this.budgetRepo.addDeposit(this.depositAmt, this.currentUser.userName).subscribe(() => {
      this.balance = +this.balance + +this.depositAmt;
      localStorage.setItem('balance', JSON.stringify(this.balance));
    });
  }
}
