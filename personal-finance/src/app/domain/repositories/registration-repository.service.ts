import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { map } from 'rxjs/operators';
@Injectable()
export class RegistrationRepository {

  protected endpoint = 'http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/registration';

  constructor (private httpClient: HttpClient) {}

  // updatePassword(userName: String, pWord: String, old_pWord: String) {
  //   return this.httpClient.put<any>(`${this.endpoint}edit-pass`, {userName: userName, pWord: pWord, old_pWord: old_pWord})
  //   .pipe(map(response => {
  //       if (response.error) {
  //         return 0;
  //       }
  //     }));
  // }


  public register(account: Account): Observable<any> {
    return this.httpClient.post<any>(this.endpoint, account)
    .pipe(map(response => {
        if (response.error) {
          return 0;
        }
    }));
  }

}
