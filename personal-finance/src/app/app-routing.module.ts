import { BudgetComponent } from './budget/budget.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoansComponent } from './loans/loans.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SettingsComponent } from './settings/settings.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomepageComponent },
  {path: 'register', component: RegistrationComponent},
  { path: '', component: LandingPageComponent},
  { path: 'budget', component: BudgetComponent},
  { path: 'loans', component: LoansComponent},
  { path: 'settings', component: SettingsComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
