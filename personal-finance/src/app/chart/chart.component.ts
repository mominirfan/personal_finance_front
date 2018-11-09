import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { HomepageRepository } from '../domain/repositories/homepage-repository.service';
import { Bill } from '../domain/models/bill';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  // budget_labels = ['Savings', 'Misc.', 'House', 'Car', 'Fun', 'Util.', 'Food'];
  budget_labels = [];
  // spend_vals = [500, 400, 400, 300, 400, 300, 500];
  spend_vals = [];
  bills: Bill[];

  constructor(
    private homepageRepo: HomepageRepository,
  ) { }

  ngOnInit() {
    this.homepageRepo.getBills().subscribe((bills) => {
      this.bills = bills;

      for (const bill of this.bills) {
        this.budget_labels.push(bill.budgetType);
        const amt = +bill.amt;
        this.spend_vals.push(amt);
     }


     let spend_points = [];

     let i;
     for (i = 0 ; i < this.budget_labels.length ; i++) {
       spend_points.push({y: this.spend_vals[i], name: this.budget_labels[i]}) ;
     }


     let chart = new CanvasJS.Chart('chartContainer', {
       theme: 'light2',
       animationEnabled: true,
       exportEnabled: true,
       title: {
         text: 'Monthly Expense'
       },
       data: [{
         type: 'pie',
         showInLegend: true,
         toolTipContent: '<b>{name}</b>: ${y} (#percent%)',
         indexLabel: '{name} - #percent%',
         dataPoints: spend_points
       }]
     });

     chart.render();
    });


  }
}
