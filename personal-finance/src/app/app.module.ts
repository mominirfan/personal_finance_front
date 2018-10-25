import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { ChartComponent } from './chart/chart.component';
import { PiechartDirective } from './piechart.directive';
import{ LoginComponent } from './login/login.component';
import { AppRoutingModule }     from './app-routing.module';
import { BudgetComponent } from './budget/budget.component';
import { ComponentComponent } from './component/component.component';
import { LoansComponent } from './loans/loans.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavBarComponent,
    ChartComponent,
    PiechartDirective,
    LoginComponent,
    BudgetComponent,
    ComponentComponent,
    LoansComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
