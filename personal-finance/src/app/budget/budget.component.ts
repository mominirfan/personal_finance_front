import { ExpenseSum } from './../domain/models/expense_sum';
import { BudgetItem } from './../domain/models/budget-item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Budget } from './../domain/models/budget';
import { BudgetEditRepository } from './../domain/repositories/budget-edit-repository.service';
import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../chart/canvasjs.min';
import { ExpensesService } from '../domain/repositories/expenses.services';
import { Expense } from '../domain/models/expense';
import { Router } from '@angular/router';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budget_drop = ['','Food','Savings','Util.','Car','House','Ent.'];
  budget_labels = [];
  monthly_inc: number; // make this thier monthly income
  budget_vals = [];
  spend_vals = [500, 400, 400, 300, 400, 300, 500];
  budget = [];
  currentUser: any = {};
  balance: number;

  // Editor Members
  budg: Budget = {};
  newBudget: BudgetItem = {};
  newExpense: Expense = {};

  expenses: Expense[];
  summed_expenses: ExpenseSum[];
  depositAmt: number;

  constructor(
    private budgetRepo: BudgetEditRepository,
    private modalService: NgbModal,
    private expenseService: ExpensesService,
    private router: Router,
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

    if (this.budget_labels.includes(this.newBudget.budgetType)) {

      this.budgetRepo.editBudget(this.newBudget).subscribe(() => {
        console.log(this.newBudget);
      });
      // this.budg = this.newBudget;


      this.newBudget.amt = undefined;
      this.budgetRepo.getBudget(this.currentUser.userName).subscribe((budget) => {
      this.budget = budget;
      this.initBudgets();
      this.updateChart();
    });

    } else {
      this.budgetRepo.addBudget(this.newBudget).subscribe(() => {
        console.log(this.newBudget);
      });
      // this.budg = this.newBudget;


      this.newBudget.amt = undefined;
      this.budgetRepo.getBudget(this.currentUser.userName).subscribe((budget) => {
      this.budget = budget;
      this.initBudgets();
      this.updateChart();

    });

    }


  }

  saveExpense() {
    this.expenseService.addExpense(this.newExpense).subscribe(() => {
      this.getExpenses();
      console.log(this.expenses);
    });


    this.newExpense.amt = undefined;
    this.getExpenses();
    this.budgetRepo.getBudget(this.currentUser.userName).subscribe((budget) => {
    this.initBudgets();
    this.updateChart();
  });
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
      text: ' % Budget For This Month',
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

  getExpenseSum() {
    this.expenseService.getExpenseSum(this.currentUser.userName).subscribe((summed_expenses) => {
      this.summed_expenses = summed_expenses;
      this.initBudgets();
      this.updateChart();

    });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.currentUser) {
      this.router.navigate(['login']);
      return;
    }

    this.budgetRepo.getBudget(this.currentUser.userName).subscribe((budget) => {
      this.budget = budget;
      this.newBudget.userName = this.currentUser.userName;
      this.newExpense.userName = this.currentUser.userName;
      this.monthly_inc = 5000;
      this.initBudgets();
      this.getExpenses();
      this.updateChart();
  });

}
  deposit() {
    this.budgetRepo.addDeposit(this.depositAmt, this.currentUser.userName).subscribe(() => {
      this.balance = +this.balance + +this.depositAmt;
      localStorage.setItem('balance', JSON.stringify(this.balance));
    });
  }
}
