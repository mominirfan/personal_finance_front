import { Component, OnInit, Input } from '@angular/core';
import { Account, RegistrationRepository } from '../domain';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private account: Account;
  // private username: string;
  private password: string;
  private password2: string;
  // private firstname: string;
  // private lastname: string;
  // private email: string;
  // private income: string;

  constructor( private registrationRepository: RegistrationRepository ) {
    this.account = new Account;
  }

  ngOnInit() {
  }

  private subReg() {
    if (this.password === this.password2) {
      this.account.pWord = this.password;
      this.registrationRepository.register(this.account).subscribe(x => this.register(x));
    }

  }
  private register( account: Account ) {
    this.account = new Account;
    console.log(account);
    this.password = null;
    this.password2 = null;
  }

}
