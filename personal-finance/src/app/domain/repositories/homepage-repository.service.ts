import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill';
import { Suggestion } from '../models/suggestion';

@Injectable({
  providedIn: 'root',
})
export class HomepageRepository {

  protected endpoint = 'http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/get-budgets/';
  protected suggestionEndpoint = 'http://ec2-18-224-109-208.us-east-2.compute.amazonaws.com:8080/api/get-sugg/';

  constructor (private httpClient: HttpClient) {}

  getBills(userName: String): Observable<Bill[]> {
    return this.httpClient.get<Bill[]>(`${this.endpoint}${userName}`);
  }

  getSuggestions(userName: String): Observable<Suggestion[]> {
    return this.httpClient.get<Suggestion[]>(`${this.suggestionEndpoint}${userName}`);
  }

}
