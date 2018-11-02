import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationRepository } from './repositories/registration-repository.service';
@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    RegistrationRepository
  ]
})

export class DomainModule { }
