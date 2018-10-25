import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../chart/canvasjs.min';


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let chart = new CanvasJS.Chart('chartContainer',
    {
      title:{
      text: 'Budget'
      },

      data: [
      {
        type: 'stackedBar',
         dataPoints: [
        { x: new Date(2012, 1, 1), y: 71 },
        { x: new Date(2012, 2, 1), y: 55},
        { x: new Date(2012, 3, 1), y: 50 },
        { x: new Date(2012, 4, 1), y: 65 },
        { x: new Date(2012, 5, 1), y: 95 }

        ]
      },
        {
        type: 'stackedBar',
         dataPoints: [
        { x: new Date(2012, 1, 1), y: 71 },
        { x: new Date(2012, 2, 1), y: 55},
        { x: new Date(2012, 3, 1), y: 50 },
        { x: new Date(2012, 4, 1), y: 65 },
        { x: new Date(2012, 5, 1), y: 95 }

        ]
      }

      ]
    });

    chart.render();
  }

}
