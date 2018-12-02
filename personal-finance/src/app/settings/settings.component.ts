import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SettingsRepository } from '../domain/repositories/settings-repository.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentUser: any = { };
  oldPass: string;
  newPass: string;
  newPass2: string;
  newBalance: number;
  newIncome: number;
  passwordForm: FormGroup;
  passwordNotMatch: boolean;
  samePass: boolean;
  income: number;
  balance: number;
  loaded = false;
  constructor(private sr: SettingsRepository) {
      this.passwordNotMatch = false;
      this.samePass = false;
     }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.balance = JSON.parse(localStorage.getItem('balance'));
    this.sr.getInfo(this.currentUser.userName).subscribe(info => {
      this.income = info.income;
      this.balance = info.bal;
      this.loaded = true;
    });
  }

  submitPR() {
    this.passwordNotMatch = false;
    this.samePass = false;
    if (this.newPass === this.newPass2) {
      this.sr.updatePassword(this.currentUser.userName, this.newPass, this.oldPass).subscribe(x => this.onPassUpdate(x));
    } else {
      this.passwordNotMatch = true;
    }
  }

  submitI() {
    this.sr.updateIncome(this.currentUser.userName, this.newIncome).subscribe(x => {
      this.income = this.newIncome;
      this.newIncome = null;
    });
  }

  submitB( incomeUpdateFrom: FormGroup) {
    this.sr.updateBalance(this.currentUser.userName, this.newBalance).subscribe(x => {
      localStorage.setItem('balance', JSON.stringify(this.newBalance));
      this.balance = this.newBalance;
      this.newBalance = null;
    });
  }

  onPassUpdate(a: any) {
    if (a === 0) {
      this.samePass = true;
      return;
    } else {
      this.oldPass = null;
      this.newPass = null;
      this.newPass2 = null;
    }
  }
}
