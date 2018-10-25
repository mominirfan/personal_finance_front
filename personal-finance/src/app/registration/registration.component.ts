import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @Input()
  private username: string;
  private password: string;
  private password2: string;
  private firstname: string;
  private lastname: string;
  private email: string;
  private income: string;

  constructor() { }

  ngOnInit() {
  }

  private subReg() {
    console.log(this.username);
    console.log(this.password);
    console.log(this.password2);
    console.log(this.firstname);
    console.log(this.lastname);
    console.log(this.email);
    console.log(this.income);
    this.username = null;
    this.password = null;
    this.password2 = null;
    this.firstname = null;
    this.lastname = null;
    this.email = null;
    this.income = null;
  }

}
