import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill';
import { Suggestion } from '../models/suggestion';

@Injectable({
  providedIn: 'root'
})
export class HomepageRepository {

  protected endpoint = 'http://ec2-3-16-30-192.us-east-2.compute.amazonaws.com:8080/api/get-budgets/postMalone';
  protected suggestionEndpoint = 'http://ec2-3-16-30-192.us-east-2.compute.amazonaws.com:8080/api/get-suggs/';

  constructor (private httpClient: HttpClient) {}

  getBills(): Observable<Bill[]> {
    return this.httpClient.get<Bill[]>(this.endpoint);
  }

  getSuggestions(type: string): Observable<Suggestion[]> {
    return this.httpClient.get<Suggestion[]>(`${this.suggestionEndpoint}${type}`);
  }

}
