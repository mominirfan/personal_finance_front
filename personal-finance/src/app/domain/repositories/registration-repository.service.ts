import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
@Injectable()
export class RegistrationRepository {

  protected endpoint = 'http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/registration';

  constructor (private httpClient: HttpClient) {}

  public register(account: Account): Observable<Account> {
    return this.httpClient.post(this.endpoint, account);
  }

}
