import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { ChartComponent } from './chart/chart.component';
import { PiechartDirective } from './piechart.directive';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BudgetComponent } from './budget/budget.component';
import { ComponentComponent } from './component/component.component';
import { LoansComponent } from './loans/loans.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { DomainModule } from './domain';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BudgetEditRepository } from './domain/repositories/budget-edit-repository.service';
import { ExpensesService } from './domain/repositories/expenses.services';
import { SettingsComponent } from './settings/settings.component';

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
    LoansComponent,
    RegistrationComponent,
    LandingPageComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DomainModule,
    HttpClientModule
  ],
  providers: [
    BudgetEditRepository,
    ExpensesService,
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
