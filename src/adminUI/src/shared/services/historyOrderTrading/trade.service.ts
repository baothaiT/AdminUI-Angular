import { Injectable } from '@angular/core';
import { catchError, interval, map, Observable, of, startWith, switchMap, throwError } from 'rxjs';
import { HistoryOrderTradeInterface } from '../../interfaces/HistoryOrderTrade-interface';
import { Configuration } from '../../Configuration/Configuration';
import { HttpClient } from '@angular/common/http';
import { HistoryOrderTradingEnum } from '../../common/Enums/HistoryOrderTradingEnum';
import { IsResolveNameEnum } from '../../common/Enums/IsResolveNameEnum';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private apiUrl = Configuration.HistoryOrderTradingAPI; // Replace with your API endpoint
  private side = '';
  private isResolve : IsResolveNameEnum = IsResolveNameEnum.ALLSTATUS;
  private symbolPrefix= '';
  private _colSortName : HistoryOrderTradingEnum = HistoryOrderTradingEnum.None;
  constructor(private http: HttpClient) { }

  setColSortName(colSortName: HistoryOrderTradingEnum)
  {
    this._colSortName = colSortName;
  }
  setSide(side: string)
  {
    this.side = side;
  }
  setIsResolve(isResolve: IsResolveNameEnum)
  {
    this.isResolve = isResolve;
  }
  setSymbolPrefix(symbolPrefix: string)
  {
    this.symbolPrefix = symbolPrefix;
  }
  getTrade(milisecond: number): Observable<HistoryOrderTradeInterface[]> {
    return interval(milisecond).pipe(
      startWith(0),
      switchMap((data) => {
        if (this.side === '' && this.symbolPrefix == '' && this.isResolve == IsResolveNameEnum.ALLSTATUS && this._colSortName == HistoryOrderTradingEnum.None) {
          return this.getAll();
        }
        else {
          return this.getByParam();
        }
      }
      )
    );
  }
  
  getByParam(): Observable<HistoryOrderTradeInterface[]>
  {
    let url = this.apiUrl + '/byparam';
    if(this.side != '')
    {
      url = this.checkURL(url) + `side=${this.side}`;
    }
    if(this.symbolPrefix != '')
    {
      url = this.checkURL(url) + `symbol_Prefix=${this.symbolPrefix}`;
    }
    if(this.isResolve != 0)
    {
      url = this.checkURL(url) + `IsResovlve=${this.isResolve}`;
    }

    url = this.checkURL(url) + `sortName=${this._colSortName}`;

    return this.http.get<HistoryOrderTradeInterface[]>(url).pipe(
      map((historyOrderTrading) => historyOrderTrading || []),
      catchError((error) => {
        console.error('Error fetching trades:', error);
        throw error;
      })
    )
  }
  getAll(): Observable<HistoryOrderTradeInterface[]>
  {
    return this.http.get<HistoryOrderTradeInterface[]>(`${this.apiUrl}/HistoryOrderTrading`).pipe(
      map((historyOrderTrading) => historyOrderTrading || []),
      catchError((error) => {
        console.error('Error fetching trades:', error);
        throw error;
      })
    )
  }

  checkURL(url: string): string
  {
    if(url.includes('?'))
    {
      url = url + '&';
    }
    else
    {
      url = url + '?';
    }
    return url;
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
