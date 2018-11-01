import { BudgetComponent } from './budget/budget.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegistrationComponent } from './registration/registration.component';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomepageComponent },
  {path: 'register', component: RegistrationComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'budget', component: BudgetComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
