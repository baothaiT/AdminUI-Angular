import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HistoryOrderTradeInterface } from '../../interfaces/HistoryOrderTrade-interface';
import { Configuration } from '../../Configuration/Configuration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private apiUrl = Configuration.HistoryOrderTradingAPI; // Replace with your API endpoint

  constructor(private http: HttpClient) { }
  getTrades(): Observable<HistoryOrderTradeInterface[]> 
  {
    return this.http.get<HistoryOrderTradeInterface[]>(this.apiUrl+'/HistoryOrderTrading').pipe(
      map((historyOrderTrading) => historyOrderTrading || []),
      catchError((error) => {
        console.error('Error fetching logs:', error);
        throw error;
      })
    );
  }
  changeIsResolve(id: string): Observable<boolean> {
    return this.http.put(
      `${this.apiUrl}/changeIsResolve/${id}`,
      {}, // Pass an empty object as the body
      { observe: 'response' } // Options go here
    ).pipe(
      map((response) => response.status === 200), // Check if the status is 200
      catchError((error) => {
        console.error('Error in changeIsResolve:', error);
        return throwError(() => new Error('Failed to change resolve state')); // Handle the error
      })
    );
}
}
