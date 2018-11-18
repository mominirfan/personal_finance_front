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

  constructor(
    // private formBuilder: FormBuilder,
    private loginRepo: LoginService,
    private router: Router,
  ) {
  }

  ngOnInit() {

  }

  login() {
    this.loginRepo.login(this.userName, this.pWord).subscribe((userName) => {
      if (userName) {
        this.userName = userName.userName;
        this.loginRepo.getInfo(this.userName).subscribe((info) => {
          localStorage.setItem('balance', JSON.stringify(info.bal));
        });
        this.router.navigate(['dashboard']);
      } else {
      }
    });
  }

}
