import { BudgetEditRepository } from './../domain/repositories/budget-edit-repository.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Budget } from '../domain/models/budget';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-editor',
  templateUrl: './budget-editor.component.html',
  styleUrls: ['./budget-editor.component.css']
})
export class BudgetEditorComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private budgetRepo: BudgetEditRepository

  ) { }

  ngOnInit() {
    this.monthly_inc = 5000;
  }


}
