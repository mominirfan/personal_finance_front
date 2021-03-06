import { Component, OnInit, Input } from '@angular/core';
import { Account, RegistrationRepository } from '../domain';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  account: Account;
  currentUser: any = {};
  password: string;
  password2: string;
  dupUsername = false;

  constructor( private registrationRepository: RegistrationRepository,
    private router: Router, ) {
    this.account = new Account;
  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.router.navigate(['dashboard']);
    }

  }

  subReg() {
    if (this.password === this.password2) {
      this.account.pWord = this.password;
      this.registrationRepository.register(this.account).subscribe(x => {
        if (x === 0 ) {
          this.dupUsername = true;
          return;
        } else {
          this.account = new Account;
          this.password = null;
          this.password2 = null;
          this.router.navigate(['login']);
        }
      }
        );
    }


  }
  private register( account: Account ) {
    this.account = new Account;
    console.log(account);
    this.password = null;
    this.password2 = null;
  }

}
