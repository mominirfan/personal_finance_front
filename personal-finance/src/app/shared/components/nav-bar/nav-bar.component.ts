import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/domain/repositories/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private loginRepo: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.loginRepo.logout();
  }

  toLanding() {
    this.router.navigate(['landing']);
  }

}
