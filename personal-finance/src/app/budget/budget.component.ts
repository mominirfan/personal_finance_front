import { BudgetItem } from './../domain/models/budget-item';
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

  budget_labels = [];
  monthly_inc: number; // make this thier monthly income
  budget_vals = [1000, 500, 500, 500, 500, 500, 500];
  spend_vals = [500, 400, 400, 300, 400, 300, 500];
  budget = [];
  currentUser: any = {};
  balance: number;

  // Editor Members
  budg: Budget = {};
  newBudget: BudgetItem = {};

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
    this.budgetRepo.updateBudget(this.newBudget);
    this.budg = this.newBudget;


    this.newBudget = {};
    this.newBudget.userName = this.currentUser.userName;
    this.updateChart();
  }

  save2() {
    let newVal = [];
    let i;
    let date = new Date();
    this.spend_vals = [];
    let amt;
    let category;

    for (i = 0 ; i < this.budget_labels.length ; i++) {

      category = this.budget_labels[i];
      amt = this.newBudget[category];
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
      title: {
      text: 'Budget',
      },
      axisX: {
        gridThickness: 0
      },
      axisY: {
        gridThickness: 0
      },
      data: [
      {
        color: "#000",
        type: 'stackedBar100',
        dataPoints: spend_points
      },
        {
        color: "green",
        type: 'stackedBar100',
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

    this.newBudget.userName = this.currentUser.userName;
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
