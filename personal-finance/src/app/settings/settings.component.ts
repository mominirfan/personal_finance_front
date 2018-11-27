import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentUser: any = { };
  curPass: string;
  newPass: string;
  newPass2: string;
  curPass2: string;

  newIncome: number;
  constructor() { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  submitPR( passwordResetForm: FormGroup) {
    console.log("Submitting Password Reset Form");
  }

  submitI( incomeUpdateFrom: FormGroup) {
    console.log("Submitting Income Update Form");
  }
}
