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
  constructor(private sr: SettingsRepository) {
      this.passwordNotMatch = false;
      this.samePass = false;
     }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  submitPR() {
    this.passwordNotMatch = false;
    this.samePass = false;
    if (this.newPass === this.newPass2) {
      this.sr.updatePassword(this.currentUser.userName, this.newPass, this.oldPass).subscribe(x => this.onUpdate(x));
    } else {
      this.passwordNotMatch = true;
    }
  }

  submitI( incomeUpdateFrom: FormGroup) {
    console.log('Submitting Income Update Form');
    this.sr.updateIncome(this.currentUser.userName, this.newIncome).subscribe(x => this.onUpdate(x));
  }

  submitB( incomeUpdateFrom: FormGroup) {
    console.log('Submitting Balance Update Form');
    this.sr.updateBalance(this.currentUser.userName, this.newBalance).subscribe(x => this.onUpdate(x));
  }

  onUpdate(a: any) {
    if (a === 0) {
      this.samePass = true;
      return;
    } else {
      this.oldPass = null;
      this.newPass = null;
      this.newPass2 = null;
      this.newIncome = null;
      this.newBalance = null;
    }

  }
}
