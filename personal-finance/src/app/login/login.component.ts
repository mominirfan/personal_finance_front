import { Component, OnInit } from '@angular/core';
import { LoginService } from '../domain/repositories/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: String;
  pWord: String;
  currentUser: any = {};
  load = false;

  constructor(
    private loginRepo: LoginService,
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.router.navigate(['dashboard']);
    }
    this.load = true;
  }

  login() {
    this.loginRepo.login(this.userName, this.pWord).subscribe((userName) => {
      if (userName) {
        this.userName = userName.userName;
        this.loginRepo.getInfo(this.userName).subscribe((info) => {
          localStorage.setItem('balance', JSON.stringify(info.bal));
          this.router.navigate(['dashboard']);
        });
      } else {

      }
    });
  }

}
