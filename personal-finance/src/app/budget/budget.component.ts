import { LoanRepository } from "./../domain/repositories/loan-repository.service";
import { Account } from "./../domain/models/account";
import { LoginService } from "./../domain/repositories/login.service";
import { ExpenseSum } from "./../domain/models/expense_sum";
import { BudgetItem } from "./../domain/models/budget-item";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Budget } from "./../domain/models/budget";
import { BudgetEditRepository } from "./../domain/repositories/budget-edit-repository.service";
import { Component, OnInit } from "@angular/core";
import * as CanvasJS from "../chart/canvasjs.min";
import { ExpensesService } from "../domain/repositories/expenses.services";
import { Expense } from "../domain/models/expense";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-budget",
  templateUrl: "./budget.component.html",
  styleUrls: ["./budget.component.css"]
})
export class BudgetComponent implements OnInit {
  budget_drop = [
    "",
    "Food",
    "Savings",
    "Util.",
    "Car",
    "House",
    "Ent.",
    "Misc."
  ];
  expenses_drop = [""];
  budget_labels = [];
  monthly_inc: number; // make this thier monthly income
  budget_vals = [];
  spend_vals = [];
  budget = [];
  currentUser: Account;
  incUser: Account;
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
    private LoginService: LoginService,
    private loanRepo: LoanRepository
  ) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.balance = JSON.parse(localStorage.getItem("balance"));
  }

  initBudgets() {
    this.budget_labels = [];
    this.budget_vals = [];
    this.expenses_drop = [""];
    let i;
    let label;
    let bud;
    let exp;
    for (i = 0; i < this.budget.length; i++) {
      label = this.budget[i]["budgetType"];
      bud = this.budget[i]["amt"];
      let k;
      for (k = 0; k < this.summed_expenses.length; k++) {
        let temp_exp = this.summed_expenses[k];
        if (temp_exp.exType === label) {
          exp = this.summed_expenses[k].amt;
        }
      }

      this.budget_labels.push(label);
      this.budget_vals.push(bud);
      this.spend_vals.push(exp);

      if (this.budget[i]["amt"] > 0) {
        this.expenses_drop.push(this.budget[i]["budgetType"]);
      }
    }
  }

  save(budgetForm: NgForm) {
    if (this.budget_labels.includes(this.newBudget.budgetType)) {
      this.budgetRepo.editBudget(this.newBudget).subscribe(() => {
        this.budgetRepo
          .getBudget(this.currentUser.userName)
          .subscribe(budget => {
            this.budget = budget;
            this.newBudget.budgetType = null;
            this.newBudget.amt = null;
            budgetForm.reset();
            this.initBudgets();
            this.updateChart();
          });
      });
    } else {
      this.budgetRepo.addBudget(this.newBudget).subscribe(() => {
        this.budgetRepo
          .getBudget(this.currentUser.userName)
          .subscribe(budget => {
            this.budget = budget;
            this.newBudget.budgetType = null;
            this.newBudget.amt = null;
            this.initBudgets();
            this.updateChart();
          });
        // this.budg = this.newBudget;
      });
    }
  }

  saveExpense() {
    this.expenseService.addExpense(this.newExpense).subscribe(() => {
      this.expenseService
        .getExpenseSum(this.currentUser.userName)
        .subscribe(summed_expenses => {
          let amt = +this.newExpense.amt;
          this.loanRepo
            .subtractFromBal(amt, this.currentUser.userName)
            .subscribe(() => {
              this.balance = +this.balance - amt;
              localStorage.setItem("balance", JSON.stringify(this.balance));
              this.ngOnInit();
              window.location.reload();
            });
        });
    });
  }

  updateChart() {
    let i;
    let spend_points = [];
    let remain_points = [];

    for (i = 0; i < this.budget_labels.length; i++) {
      spend_points.push({
        label: this.budget_labels[i],
        y: +this.spend_vals[i]
      });
    }


    for (i = 0; i < this.budget_labels.length; i++) {
      if (this.budget_vals[i] - this.spend_vals[i] > 0) {
        remain_points.push({
          label: this.budget_labels[i],
          y: this.budget_vals[i] - this.spend_vals[i]
        });
      } else {
        remain_points.push({
          label: this.budget_labels[i],
          y: -1 * (this.budget_vals[i] - this.spend_vals[i]),
          color: "rgba(217,83,79,0.9)"
        });
      }
    }


    let chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: " Budget % Remaining For This Month"
      },
      axisX: {
        gridThickness: 0
      },
      axisY: {
        gridThickness: 0
      },
      data: [
        {
          color: "rgba(217,83,79,0.9)",
          type: "stackedBar100",
          dataPoints: spend_points
        },
        {
          color: "rgba(92,184,92,0.9)",
          type: "stackedBar100",
          dataPoints: remain_points
        }
      ]
    });

    chart.render();
  }

  getExpenses() {
    this.expenseService
      .getExpenses(this.currentUser.userName)
      .subscribe(expenses => {
        this.expenses = expenses;
      });
  }

  getExpenseSum() {
    this.expenseService
      .getExpenseSum(this.currentUser.userName)
      .subscribe(summed_expenses => {
        this.summed_expenses = summed_expenses;
        this.initBudgets();
        try {
          this.updateChart();
        } catch {
          window.location.reload();
        }
      });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!this.currentUser) {
      this.router.navigate(["login"]);
      return;
    }

    this.budgetRepo.getBudget(this.currentUser.userName).subscribe(budget => {
      this.budget = budget;
      this.newBudget.userName = this.currentUser.userName;
      this.newExpense.userName = this.currentUser.userName;
      this.monthly_inc = this.currentUser.income;
      this.getExpenses();
      this.getExpenseSum();
      this.getIncome();
    });
  }
  deposit(depositForm: NgForm) {
    this.budgetRepo
      .addDeposit(this.depositAmt, this.currentUser.userName)
      .subscribe(() => {
        this.balance = +this.balance + +this.depositAmt;
        localStorage.setItem("balance", JSON.stringify(this.balance));
        this.depositAmt = null;
        depositForm.reset();
      });
  }

  getIncome() {
    this.LoginService.getInfo(this.currentUser.userName).subscribe(user => {
      this.incUser = user;
      this.monthly_inc = this.incUser.income;
    });
  }
}
