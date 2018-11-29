import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SettingsRepository {

  protected endpoint = 'http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/';
  protected getInfoEndpoint = 'http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/login/'

  constructor (private httpClient: HttpClient) {}

  updatePassword(userName: String, pWord: String, old_pWord: String) {
    return this.httpClient.put<any>(`${this.endpoint}edit-pass`, {userName: userName, pWord: pWord, old_pWord: old_pWord})
    .pipe(map(response => {
        if (response.error) {
          return 0;
        }
      }));
  }

  getInfo(userName: String) {
    return this.httpClient.get<any>(`${this.getInfoEndpoint}${userName}`);
  }

  updateIncome(userName: String, income: number) {
    return this.httpClient.put<any>(`${this.endpoint}edit-inc`, {userName: userName, income: income});
  }

  updateBalance(userName: String, balance: number) {
    return this.httpClient.put<any>(`${this.endpoint}edit_bal`, {userName: userName, bal: balance});
  }
}
